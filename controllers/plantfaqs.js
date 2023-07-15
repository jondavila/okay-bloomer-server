const express = require('express');
const router = express.Router();

// import the plantfaq model
const plantFaq = require('../models/plantFaq');

router.get('/', function (req, res) {
    plantFaq.find({})
        .then((plantFaqs) => {
            console.log('plantFaqs', plantFaqs);
            res.json({ plantFaqs: plantFaqs });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});

module.exports = router;