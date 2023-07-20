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

router.get('/type/:plantType', function (req, res) {
    PlantDetail.find({ type: req.params.plantType })
        .then((plantDetails) => {
            console.log('plantDetails', plantDetails);
            res.json({ plantDetails: plantDetails });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});

router.get('/plantTypes', function (req, res) {
    PlantDetail.find({})
        .then((plantDetails) => {
            let result = [];
            for (let i = 0; i < plantDetails.length; i++) {
                if (!plantDetails[i].type) {
                } else if (plantDetails[i].type === null) {
                    if (!result.includes('other')) {
                        result.push('other');
                    }
                } else {
                    let uniquePlantType = plantDetails[i].type;
                    if (!result.includes(uniquePlantType)) {
                        result.push(uniquePlantType);
                    }
                }
            }
            console.log('plantTypes', result);
            res.json({ plantTypes: result });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});

router.get('/:plantId', function (req, res) {
    let inputPlantId = parseInt(req.params.plantId);
    console.log('HELPELEKJROSKJFDSOJF=====================', req.params.plantId);
    console.log('=====================HELPELEKJROSKJFDSOJF', inputPlantId);
    PlantDetail.findOne({ plantId: inputPlantId })
        .then((plantDetail) => {
            console.log('plantDetail', plantDetail);
            res.json({ plantDetail: plantDetail });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});

router.get('/journalEntries/:plantId', function (req, res) {
    PlantList.findOne({ plantId: req.params.plantId })
        .then((plantList) => {
            console.log('plantList', plantList);
            res.json({ journalEntries: plantList.journalEntries });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});


module.exports = router;


