const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/mongodb');
const formRoutes = require('./routes/form.routes');
const path = require('path');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// My routes
app.use('/api', formRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
