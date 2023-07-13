const mongoose = require('mongoose');

//@TODO: check code below

// q: How do I add an array to my schema?
// a: https://mongoosejs.com/docs/schematypes.html#arrays


const plantGuideSchema = new mongoose.Schema({
    wateringDescription: String,
    sunlightDescription: String,
    pruningDescription: String,
    plantId: String,

}, { timestamps: true });


// create model
const PlantGuide = mongoose.model('PlantGuide', plantGuideSchema);



module.exports = PlantGuide;