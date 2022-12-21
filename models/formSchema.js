const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    message:{
        type: String,
        required: true,
        maxlength: 50000
    }
});
const Form = mongoose.model('Form', formSchema);
module.exports = Form;