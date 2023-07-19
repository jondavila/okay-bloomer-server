const PlantGuide = require('../models/plantGuide');
const { createPlantGuide, addPlantGuides } = require('../utils');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });

addPlantGuides(1);

for (let i = 6; i <= 250; i++) {
    addPlantGuides(i);
}
