const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Animal = require('../models/Animal')

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect
    }
    const user = req.user
    res.render('admin/dashboard', { user })
})

router.get('/dashboard/animals', async (req, res) => {
    try {
        const animals = await Animal.find();
        res.render('admin/animals/index-animals', { animals })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/dashboard/add-animals', (req, res) => {
    res.render('admin/animals/create-animals')
})


router.post('/dashboard/add-animals', async (req, res) => {
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
            adopted: adopted ? true : false,
            healthStatus,
            vaccinations: vaccinations.split(',').map(vaccine => vaccine.trim()),
            adoptionDate,
            photoUrl,
            notes
        });
        const animal = await savedAnimal.save();
        res.redirect('/dashboard/animals')
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/animals/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animale non trovato' });
        }
        res.status(200)
        res.render('admin/animals/details-animals', { animal })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router