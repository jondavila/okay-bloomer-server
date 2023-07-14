const express = require('express');
const router = express.Router();

// import the plantList model
const PlantList = require('../models/plantList');

router.get('/', function (req, res) {
    PlantList.find({})
        .then((plantLists) => {
            console.log('plantLists', plantLists);
            res.json({ plantLists: plantLists });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});



module.exports = router;