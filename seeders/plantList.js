const PlantList = require('../models/plantList');
const { addPlantList } = require('../utils');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });

addPlantList(1);

for (let i = 2; i <= 10; i++) {
    addPlantList(i);
}

