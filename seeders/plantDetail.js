
const { PlantDetail } = require('../models');
const { createPlantDetails, addPlantDetails } = require('../utils');


for (let i = 1; i <= 20; i++) {
    addPlantDetails(i);
}