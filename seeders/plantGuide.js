const { PlantGuide } = require('../models');
const { createPlantGuide, addPlantGuides } = require('../utils');

addPlantGuides(1);

for (let i = 1; i <= 5; i++) {
    addPlantGuides(i);
}
