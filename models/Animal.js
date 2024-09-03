const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true }, // e.g., Dog, Cat
    breed: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    description: { type: String },
    arrivalDate: { type: Date, required: true },
    adopted: { type: Boolean, default: false },
    healthStatus: { type: String }, // e.g., Healthy, Needs attention, etc.
    vaccinations: [{ type: String }], // e.g., Rabies, Distemper, etc.
    adoptionDate: { type: Date },
    photo: { type: String }, // URL for the animal's photo
    notes: { type: String }, // Additional notes

    // Nuovi campi
    deathDate: { type: Date }, // Data di decesso, se applicabile
    microchipNumber: { type: String, unique: true, required: true }, // Numero di microchip
    sterilization: {
        isSterilized: { type: Boolean, default: false }, // Sterilizzazione: sì o no
        sterilizationDate: { type: Date }, // Data di sterilizzazione
        method: { type: String }, // Metodo di sterilizzazione
    },
    therapy: [{
        name: { type: String, }, // Nome del farmaco o terapia
        dosage: { type: String }, // Dosaggio del farmaco
        startDate: { type: Date }, // Data d'inizio della terapia
        endDate: { type: Date } // Data di fine della terapia (se applicabile)
    }]
});

const Animal = mongoose.model('Animal', AnimalSchema, 'animals');

module.exports = Animal;

