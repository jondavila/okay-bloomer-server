const mongoose = require('mongoose');

// order schema
const plantFaqSchema = new mongoose.Schema({
    question: String,
    answer: String,
    faqId: Number,
}, { timestamps: true });

// create the model
const PlantFaq = mongoose.model('PlantFaq', plantFaqSchema);

module.exports = PlantFaq;





