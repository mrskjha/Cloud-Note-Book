const connectToMongo = require('./db');
const express = require('express');

const app = express();
const port = 5000;

(async () => {
    try {
        await connectToMongo();

        app.use(express.json());

        // Available Routes
        app.use('/api/auth', require('./routes/auth'));
        // Assuming you have a 'notes' route defined similarly
        app.use('/api/notes', require('./routes/notes'));

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error.message);
        // Exit the process if unable to start the server
        process.exit(1);
    }
})();
