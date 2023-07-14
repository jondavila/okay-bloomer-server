const PlantDetail = require('../models/plantDetail');
const { createPlantDetails, addPlantDetails } = require('../utils');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });


for (let i = 2801; i <= 3000; i++) {
    addPlantDetails(i);
}