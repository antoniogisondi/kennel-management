const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Animal = require('../models/Animal')

router.get('/dashboard', (req, res) => {
    const user = req.user
    res.render('admin/dashboard', { user })
})

router.get('/dashboard/animals', async (req, res) => {
    try {
        const animals = await Animal.find();
        res.render('admin/animals/index-animals')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/dashboard/animals', async (req, res) => {
    try {
        const { name, species, breed, age, gender, description, arrivalDate, adopted, healthStatus, vaccinations, adoptionDate, photoUrl, notes } = req.body;
        const savedAnimal = new Animal({
            name,
            species,
            breed,
            age,
            gender,
            description,
            arrivalDate,
            adopted,
            healthStatus,
            vaccinations,
            adoptionDate,
            photoUrl,
            notes
        });
        const animal = await savedAnimal.save();

    } catch (error) {

    }
})

module.exports = router