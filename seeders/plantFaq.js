const plantFaq = require('../models/plantFaq');
const { createPlantFaq, addPlantFaq } = require('../utils');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });


for (let i = 1; i <= 30; i++) {
    addPlantFaq(i);
}