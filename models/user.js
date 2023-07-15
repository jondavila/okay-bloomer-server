const mongoose = require('mongoose');
const journalEntry = require('../models/journalEntry');


// create the embedded document schema
const plantSanctuarySchema = new mongoose.Schema({
    myPlants: [{
        plantNickname: String,
        plantOfficialName: String,
        plantImage: String,
        plantId: Number,
        plantTasks: [''],
        JournalEntry: [JournalEntry]
    }]
}, { timestamps: true });

// create the user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    jobTitle: String,
    birthdate: Date,
    password: { type: String, required: true },
    address: {
        streetAddress: String,
        city: String,
        state: String,
        zipCode: Number
    },
    number: String,
    plants: [plantSanctuarySchema],

}, { timestamps: true });



// create model
const User = mongoose.model('User', userSchema);
const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// export the model to be used
module.exports = User, JournalEntry;