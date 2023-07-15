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

router.get('/:plantId', function (req, res) {
    PlantList.findOne({ plantId: req.params.plantId })
        .then((plantList) => {
            console.log('plantList', plantList);
            res.json({ plantList: plantList });
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

// ================================ POST ================================ //

router.post('/new', function (req, res) {
    PlantList.findOne({ plantId: req.params.plantId })
        .then((plantList) => {
            plantList.journalEntries.push(req.body);
            plantList.save()
                .then((plantList) => {
                    res.json({ journalEntries: plantList.journalEntries });
                })
                .catch((error) => {
                    console.log('error', error);
                    res.json({ message: 'There was an issue, please try again...' });
                });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});


// ================================ PUT ================================ //

router.put('/journalEntries/:plantId/:journalEntryId', function (req, res) {
    PlantList.findOne({ plantId: req.params.plantId })
        .then((plantList) => {
            plantList.journalEntries.id(req.params.journalEntryId).entry = req.body.entry;
            plantList.save()
                .then((plantList) => {
                    res.json({ journalEntries: plantList.journalEntries });
                })
                .catch((error) => {
                    console.log('error', error);
                    res.json({ message: 'There was an issue, please try again...' });
                });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});


// ================================ DELETE ================================ //

router.delete('/journalEntries/:plantId/:journalEntryId', function (req, res) {
    PlantList.findOne({ plantId: req.params.plantId })
        .then((plantList) => {
            plantList.journalEntries.id(req.params.journalEntryId).remove();
            plantList.save()
                .then((plantList) => {
                    res.json({ journalEntries: plantList.journalEntries });
                })
                .catch((error) => {
                    console.log('error', error);
                    res.json({ message: 'There was an issue, please try again...' });
                });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});











module.exports = router;