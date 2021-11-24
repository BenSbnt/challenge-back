const connection = require('./db-config');
const express = require('express');
const app = express();
const router = require('./route');
const cors = require('cors');

const port = process.env.PORT || 8000;

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
    } else {
        console.log('connected as id ' + connection.threadId);
    }
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/api', router);
app.use(cors())
app.get("/", (req, res) => {
    res.send("Welcome");
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;