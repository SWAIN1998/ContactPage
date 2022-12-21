const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose.connection;
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});
module.exports = db;