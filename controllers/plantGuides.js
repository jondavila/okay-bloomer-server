const express = require('express');
const router = express.Router();

// import the plantdetails model
const PlantGuide = require('../models/plantGuide');

router.get('/', function (req, res) {
    PlantGuide.find({})
        .then((plantGuides) => {
            console.log('plantGuides', plantGuides);
            res.json({ plantGuides: plantGuides });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});

router.get('/:plantId', function (req, res) {
    PlantGuide.findOne({ plantId: req.params.plantId })
        .then((plantGuide) => {
            console.log('plantGuide', plantGuide);
            res.json({ plantGuide: plantGuide });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});



module.exports = router;