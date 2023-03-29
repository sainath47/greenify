const mongoose = require('mongoose');
require('dotenv').config();
exports.DB_CONNECTION = async () => {
    try {
       await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,},isConnected)
    }
    catch (err) {
        console.log(err);
    }

}
const isConnected = (err) => {
    if (err) {
        console.log('Error connecting to database', err);
    }
    return console.log('Connected to database');
} 