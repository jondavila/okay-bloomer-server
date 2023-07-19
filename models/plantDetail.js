const mongoose = require('mongoose');



const plantDetailSchema = new mongoose.Schema({
    commonName: String,
    scientificName: [String],
    cycle: String,
    watering: String,
    sunlight: [String],
    health: Number,
    image: String,
    type: String,
    propagation: [{
        type: String,
    }],
    flowers: Boolean,
    floweringSeason: String,
    soil: [{
        type: String,
    }],
    growthRate: String,
    maintenance: String,
    poisonousHumans: Number,
    poisonousPets: Number,
    invasive: Boolean,
    thorny: Boolean,
    indoor: Boolean,
    careLevel: String,
    pruningMonth: [{
        type: String,
    }],
    pruningCount: {
        amount: Number,
        interval: String,
    },
    description: String,
    plantId: Number,

}, { timestamps: true });




// create model
const PlantDetail = mongoose.model('PlantDetail', plantDetailSchema);



module.exports = PlantDetail;