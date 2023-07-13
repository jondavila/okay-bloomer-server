const PlantGuide = require('../models/plantGuide');
const { createPlantGuide, addPlantGuides } = require('../utils');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });

addPlantGuides(1);

for (let i = 1; i <= 5; i++) {
    addPlantGuides(i);
}
