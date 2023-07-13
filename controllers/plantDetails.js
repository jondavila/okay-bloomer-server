const express = require('express');
const router = express.Router();

// import the plantdetails model
const plantDetail = require('../models/plantDetail');

router.get('/', function (req, res) {
    plantDetail.find({})
        .then((plantDetails) => {
            console.log('plantDetails', plantDetails);
            res.json({ plantDetails: plantDetails });
        })
        .catch((error) => {
            console.log('error', error);
            res.json({ message: 'There was an issue, please try again...' });
        });
});

// router.get('/:field/:value', (req, res) => {
//     const value = req.params.value;
//     const field = req.params.field;
//     Vehicle.find({ [field]: [value] })
//         .then(vehicle => {
//             console.log('Found data', vehicle);
//             res.json({ vehicle: vehicle });
//         })
//         .catch(err => { console.log('ERROR', err); });

// });

// router.post('/new', (req, res) => {
//     console.log('data from request user', req.body);
//     Vehicle.findOne({ vin: req.body.vin })
//         .then((vehicle) => {
//             Vehicle.create({
//                 make: req.body.make,
//                 model: req.body.model,
//                 type: req.body.type,
//                 vin: req.body.vin,
//                 color: req.body.color,
//                 fuel: req.body.fuel
//             })
//                 .then((newVehicle) => {
//                     console.log('new vehicle created -> ', newVehicle);
//                     return res.json({ vehicle: newVehicle });
//                 })
//                 .catch(error => {
//                     console.log('error', error);
//                     return res.json({ message: 'Error, please try again.' });
//                 });

//         })
//         .catch(error => {
//             console.log('error', error);
//             return res.json({ message: 'Error, please try again.' });
//         });
// });

// router.put('/:id', (req, res) => {
//     const updateQuery = {};
//     // check make
//     if (req.body.make) {
//         updateQuery.make = req.body.make;
//     }
//     // check model
//     if (req.body.model) {
//         updateQuery.model = req.body.model;
//     }
//     // check type
//     if (req.body.type) {
//         updateQuery.type = req.body.type;
//     }
//     // check vin
//     if (req.body.vin) {
//         updateQuery.vin = req.body.vin;
//     }
//     // check color
//     if (req.body.color) {
//         updateQuery.color = req.body.color;
//     }
//     // check fuel
//     if (req.body.fuel) {
//         updateQuery.fuel = req.body.fuel;
//     }
//     Vehicle.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
//         .then((vehicle) => {
//             return res.json({ message: `${vehicle.vin} was updated`, vehicle: vehicle });
//         })
//         .catch((error) => {
//             console.log('error inside PUT /vehicles/:id', error);
//             return res.json({ message: 'error occured, please try again.' });
//         });
// });

// router.delete('/:id', (req, res) => {
//     Vehicle.findByIdAndDelete(req.params.id)
//         .then((vehicles) => {
//             return res.json({ message: `${vehicles.vin} was deleted`, vehicles: vehicles });
//         })
//         .catch((error) => {
//             console.log('error inside DELETE /vehicles/:id', error);
//             return res.json({ message: 'error occurred, please try again.' });
//         });
// });

module.exports = router;