const mongoose = require('mongoose');

// referencing schema -- parent document
const plantListSchema = new mongoose.Schema({
    commonName: String,
    scientificName: [String],
    cycle: String,
    watering: String,
    sunlight: [String],
    health: Number,
    journalEntries: {
        type: [String],
        default: [''],
        ref: 'JournalEntry',
    },
    image: {
        type: String,
    },
    otherNames: [String],
    plantId: String,

}, { timestamps: true });


// create model
const PlantList = mongoose.model('PlantList', plantListSchema);


module.exports = PlantList;

