const { PlantList } = require('../models');
const { addPlantList } = require('../utils');

addPlantList(1);

for (let i = 2; i <= 10; i++) {
    addPlantList(i);
}

