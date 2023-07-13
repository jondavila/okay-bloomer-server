const PlantDetail = require('../models/plantDetail');
const { createPlantDetails, addPlantDetails } = require('../utils');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });

addPlantDetails(1);

for (let i = 2; i <= 10; i++) {
    addPlantDetails(i);
}