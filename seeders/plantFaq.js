const { PlantFaq } = require('../models');
const { createPlantFaq, addPlantFaq } = require('../utils');

for (let i = 1; i <= 30; i++) {
    addPlantFaq(i);
}