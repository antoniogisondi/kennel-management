const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true }, // e.g., Dog, Cat
    breed: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    description: { type: String },
    arrivalDate: { type: Date, default: Date.now },
    adopted: { type: Boolean, default: false },
    healthStatus: { type: String }, // e.g., Healthy, Needs attention, etc.
    vaccinations: [{ type: String }], // e.g., Rabies, Distemper, etc.
    adoptionDate: { type: Date },
    photoUrl: { type: String }, // URL for the animal's photo
    notes: { type: String } // Additional notes
});

const Animal = mongoose.model('Animal', AnimalSchema, 'animals');

module.exports = Animal;
