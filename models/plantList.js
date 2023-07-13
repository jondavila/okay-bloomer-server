const mongoose = require('mongoose');

// the subdocuments get created first -- embedded document
const plantListSchema = new mongoose.Schema({
    commonName: String,
    scientificName: String,
    cycle: String,
    watering: String,
    sunlight: String,
    health: Number,
    journalEntries: String,
    image: String,
    otherNames: [String],
    plantId: String,

}, { timestamps: true });




// create model
const PlantList = mongoose.model('PlantList', plantListSchema);



module.exports = PlantList;

