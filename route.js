const connection = require("./db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM equipage', (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving equipage from database');
        } else {
            res.json(result);
        }
    });
});

router.get('/:id', (req, res) => {
    const equipageId = req.params.id;
    connection.query(
        'SELECT * FROM equipage WHERE id = ?',
        [equipageId],
        (err, results) => {
            if (err) {
                res.status(500).send('Error retrieving equipage from database');
            } else {
                if (results.length) res.json(results[0]);
                else res.status(404).send('equipage not found');
            }
        }
    );
});

router.post('/', (req, res) => {
    const { firstname } = req.body;
    connection.query('INSERT INTO equipage (firstname) VALUES (?)',
        [firstname],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving the equipage');
            } else {
                const id = result.insertId;
                const createdEquipage = { id, firstname };
                res.status(201).json(createdEquipage);
            }
        }
    );
});

module.exports = router;
