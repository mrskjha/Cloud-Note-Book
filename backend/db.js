const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://sunny:sunny%406200@cluster0.oufilwx.mongodb.net/';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to Mongo successfully');
    } catch (error) {
        console.error('Error connecting to Mongo:', error.message);
        // Exit the process if unable to connect to MongoDB
        process.exit(1);
    }
}

module.exports = connectToMongo;

