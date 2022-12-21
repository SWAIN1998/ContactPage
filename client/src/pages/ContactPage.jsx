// create a contact form component in the form which will have name , email, phone, message which will be sent to the backend using axios and then saved in the database using mongoose and then displayed on the contact page.
import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactPage.module.css';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
        name,
        email,
        phone,
        message,
        };
        axios
        .post('https://clever-snaps-mite.cyclic.app/api/form', data)
        .then((res) => {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    return (
        <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default ContactPage;