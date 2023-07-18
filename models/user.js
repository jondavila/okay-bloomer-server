const mongoose = require('mongoose');


// create the journal entry for a specific plant embedded document schema
const journalEntrySchema = new mongoose.Schema({
    title: String,
    content: String,
    plantId: Number, // this is the plantId from the plantList
}, { timestamps: true });



// create the plant tasks embedded document schema
const plantTasksSchema = new mongoose.Schema({
    name: String,
    status: String, // 'watering', 'fertilizing', 'pruning', 'repotting', 'pest control'
    plantId: Number, // this is the plantId from the plantList
    date: Date,
}, { timestamps: true });


// create the embedded document schema
const plantSanctuarySchema = new mongoose.Schema({
    userPlants: [{
        plantNickname: String,
        plantOfficialName: String,
        plantImage: String,
        plantId: Number, // this is the plantId from the plantList
        plantTasks: [plantTasksSchema],
    }],
    journalEntries: [journalEntrySchema],
    health: Number,
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


// export the model to be used
module.exports = User;