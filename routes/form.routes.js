const express = require('express');
const router = express.Router();
const Form = require('../models/formSchema');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/form', async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(422).json({ error: "Please fill the form properly" });
    }
    try {
        const userExist = await Form.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const user = new Form({ name, email, phone, message });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });

        // Nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'You have received a message from your portfolio',
            text: `Name: ${name} \nEmail: ${email} \nPhone: ${phone} \nMessage: ${message}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }
        );
    } catch (err) {
        console.log(err);
    }
});
//get all the data from the database
router.get('/', async (req, res) => {
    try {
        const data = await Form.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
});
//delete the data from the database
router.delete('/form/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const
            data = await Form.findById
                (_id);
        if (!data) {
            return res.status(404).send();
        } else {
            data.remove();
            res.send(data);
        }
    } catch (err) {
        res
            .status(500)
            .send(err);
    }
});

//edit the data from the database
router.patch('/form/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await Form.findByIdAndUpdate
            (_id, req.body, { new: true });
        res.send(data);
    } catch (err) {
        res
            .status(500)
            .send(err);
    }
});

module.exports = router;