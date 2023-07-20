const express = require('express');
const PlantDetail = require('../models/plantDetail');
const router = express.Router();

const User = require('../models/user');

// this route will give us back the user's plants and journal entries
router.get('/', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            console.log('response.plants', response[0].plants);
            res.json({ response: response[0].plants });
        })
        .catch((error) => {
            console.log('error', error);
        });
});

router.get('/user/:email', (req, res) => {
    console.log('something', req.params.email);
    User.findOne({ email: req.params.email })
        .then((response) => {
            console.log('response', response);
            res.json({ user: response });
        })
        .catch((error) => {
            console.log('error', error);
        });
});

// this route will give us back ONLY THE PLANTS IN THE USER'S PLANT SANCTUARY
router.get('/plants', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            console.log('response.plants.userPlants', response[0].plants[0].userPlants);
            res.json({ response: response[0].plants[0].userPlants });
        })
        .catch((error) => {
            console.log('error', error);
        });
});

// this route will give us back a SPECIFIC PLANT IN THE USER'S PLANT SANCTUARY
router.get('/plants/single', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            console.log('response[0].plants[0].userPlants[0]', response[0].plants[0].userPlants[0]);
            res.json({ response: response[0].plants[0].userPlants[0] });
        })
        .catch((error) => {
            console.log('error', error);
        });
});


// TODO
// this route will add a plant to a user's plant sanctuary
router.post('/plants/new/:email', (req, res) => {
    User.find({ email: req.params.email })
        .then((response) => {
            const newPlant = {
                plantNickname: req.body.nickName,
                plantOfficialName: req.body.commonName,
                plantImage: req.body.image,
                plantId: req.body.id,
                waterDays: req.body.waterDays,
                plantTasks: [{
                    taskName: 'water',
                    status: 'pending',
                    plantId: req.body.id,
                    date: Date(),
                }],
            };
            response[0].plants[0].userPlants.push(newPlant);
            response[0].save()
                .then((newEntry) => {
                    console.log('newEntry', newEntry);
                    res.json({ response: newEntry });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'there is an issue, please try again' });
                });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'there is an issue, please try again' });
        });
});

router.put('/plants/single', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            let plantIndex = response[0].plants[0].userPlants.findIndex((plant) => {
                return plant.plantId === 20;
            });
            response[0].plants[0].userPlants[plantIndex].plantNickname = req.body.plantNickname;
            response.save()
                .then((newEntry) => {
                    console.log('newEntry', newEntry);
                    res.json({ response: newEntry });
                });
        });
});

router.delete('/plants/single', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            let plantIndex = response[0].plants[0].userPlants.findIndex((plant) => {
                return plant.plantId === 20;
            });
            response[0].plants[0].userPlants.splice(plantIndex, 1);
            response.save()
                .then((deletedEntry) => {
                    console.log('newEntry', deletedEntry);
                    res.json({ response: deletedEntry });
                });
        });
});


// ========================= TASK ROUTES =========================
// this route will give us back the USER'S TASKS FOR A SPECIFIC PLANT
router.get('/plants/single/tasks', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            console.log('response[0].plants[0].userPlants[0].tasks', response[0].plants[0].userPlants[0].plantTasks);
            res.json({ response: response[0].plants[0].userPlants[0].plantTasks });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ error: error });
        });
});

router.get('/plants/single/tasks/single', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            console.log('response[0].plants[0].userPlants[0].tasks[0]', response[0].plants[0].userPlants[0].plantTasks[0]);
            res.json({ response: response[0].plants[0].userPlants[0].plantTasks[0] });
        });
});

// this route will create a new task for a specific plant
router.post('/plants/single/tasks/new', (req, res) => {
    User.findOne({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            const newTask = {
                taskName: req.body.taskName,
                status: req.body.status,
                plantId: req.body.plantId,
                date: Date(),
            };
            response.plants[0].userPlants[0].plantTasks.push(newTask);
            response.save()
                .then((newEntry) => {
                    console.log('newEntry', newEntry);
                    res.json({ response: newEntry });
                });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'there is an issue, please try again' });
        });
});

// this route will edit a task for a specific plant
router.put('/plants/single/tasks/edit/:taskIndexNumber', (req, res) => {
    User.findOne({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            const updatedTaskEntry = {
                taskName: req.body.taskName,
                status: req.body.status,
                plantId: req.body.plantId,
            };
            response.plants[0].userPlants[0].plantTasks[req.params.taskIndexNumber] = updatedTaskEntry;
            response.save()
                .then((updatedEntry) => {
                    console.log('updatedEntry', updatedEntry);
                    res.json({ response: updatedEntry });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'there was error editing, please try again.' });
                });

        });
});

// this route will delete a task for a specific plant
router.delete('/plants/single/tasks/delete/:taskIndexNumber', (req, res) => {
    User.findOne({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            response.plants[0].userPlants[0].plantTasks.splice(req.params.taskIndexNumber, 1);
            response.save()
                .then((updatedEntry) => {
                    console.log('updatedEntry', updatedEntry);
                    res.json({ response: updatedEntry });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'there was error deleting, please try again.' });
                });
        });
});


// ========================= JOURNAL ROUTES =========================
// this route will give us back ONLY THE JOURNAL ENTRIES
router.get('/journal', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            console.log('response[0].plants', response[0].plants[0].journalEntries);
            res.json({ response: response[0].plants[0].journalEntries });
        })
        .catch((error) => {
            console.log('error', error);
        });
});

// this route will give us back a SPECIFIC JOURNAL ENTRY
router.get('/journal/single', (req, res) => {
    User.find({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            console.log('response[0].plants', response[0].plants[0].journalEntries[1]);
            res.json({ response: response[0].plants[0].journalEntries[1] });
        })
        .catch((error) => {
            console.log('error', error);
        });
});

// this route will create a new journal entry
router.post('/journal/single/new', (req, res) => {
    User.findOne({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            const newJournalEntry = {
                title: req.body.title,
                content: req.body.content,
                plantId: req.body.plantId,
            };
            response.plants[0].journalEntries.push(newJournalEntry);
            response.save()
                .then((newEntry) => {
                    console.log('newEntry', newEntry);
                    res.json({ response: newEntry });
                });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'there is an issue, please try again' });
        });
});

// this route will edit a journal entry
router.put('/journal/single/edit/', (req, res) => {
    User.findOne({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            const updatedJournalEntry = {
                title: req.body.title,
                content: req.body.content,
                plantId: req.body.plantId,
            };
            response.plants[0].journalEntries[2] = updatedJournalEntry; // this is just a mockup but the code should look something similar to this
            response.save()
                .then((updatedEntry) => {
                    console.log('updatedEntry', updatedEntry);
                    res.json({ response: updatedEntry });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'there was error editing, please try again.' });
                });

        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'there is an issue, please try again' });
        });
});

// this route will delete a journal entry
router.delete('/journal/single/delete/:entryIndexNumber', (req, res) => {
    User.findOne({ _id: '64b6b20174d6e5c8eacd082e' })
        .then((response) => {
            response.plants[0].journalEntries.splice(req.params.entryIndexNumber, 1);
            response.save()
                .then((deletedEntry) => {
                    console.log('deletedEntry', deletedEntry);
                    res.json({ response: deletedEntry });
                })
                .catch(error => {
                    console.log('error', error);
                    return res.json({ message: 'there was error deleting, please try again.' });
                });
        });
});





module.exports = router;
