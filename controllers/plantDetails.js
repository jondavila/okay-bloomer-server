const express = require('express');
const router = express.Router();


// import the plantdetails model
const PlantDetail = require('../models/plantDetail');

router.get('/', function (req, res) {
    PlantDetail.find({})
        .then((plantDetails) => {
            console.log('plantDetails', plantDetails);
            res.json({ plantDetails: plantDetails });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});

module.exports = router;