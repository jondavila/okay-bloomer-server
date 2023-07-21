const mongoose = require('mongoose');

// create the journal entry for a specific plant embedded document schema;;
const journalEntrySchema = new mongoose.Schema({
    title: String,
    content: String,
    plantId: Number, // this is the plantId from the plantList
}, { timestamps: true });



// create the plant tasks embedded document schema
const plantTasksSchema = new mongoose.Schema({
    taskName: String, // 'water', 'fertilize', 'repot', 'prune', 'rotate', 'clean', 'check for pests'
    status: {
        type: String,
        default: 'pending',
    },
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
        health: Number,
        waterDays: String
    }],
    journalEntries: [journalEntrySchema],
    averagehealth: Number,
}, { timestamps: true });


// create the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plants: [plantSanctuarySchema],
}, { timestamps: true });



// create model
const User = mongoose.model('User', userSchema);


// export the model to be used
module.exports = User;