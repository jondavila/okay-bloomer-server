const mongoose = require('mongoose');
// referenced schema -- child document
const journalEntrySchema = new mongoose.Schema({
    entry: String,
    date: Date,
    plantId: String,
}, { timestamps: true });

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;