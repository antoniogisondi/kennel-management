const express = require('express')
const router = express.Router()
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

router.get('/dashboard/animals/add-animals', (req, res) => {
    res.render('admin/animals/create-animals')
})


router.post('/dashboard/animals/add-animals', async (req, res) => {
    try {
        if (req.body.therapy) {
            req.body.therapy = req.body.therapy.filter(t => t.name || t.dosage || t.startDate || t.endDate);
        }
        const savedAnimal = new Animal(req.body);
        const animal = await savedAnimal.save();
        res.redirect('/dashboard/animals')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/dashboard/animals/:id', async (req, res) => {
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

router.get('/dashboard/animals/:id/edit-animals', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id)
        if (!animal) {
            return res.redirect('/dashboard/animals')
        }
        res.render('admin/animals/edit-animals', { animal })
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/dashboard/animals/:id/edit-animals', async (req, res) => {
    try {
        const animalId = req.params.id;
        if (!animalId) {
            return res.status(400).json({ message: 'ID non valido' });
        }

        const animal = await Animal.findById(animalId);
        if (!animal) {
            return res.status(404).json({ message: 'Animale non trovato' });
        }

        // Aggiorna i campi dell'animale con i dati forniti
        Object.assign(animal, req.body);

        const updatedAnimal = await animal.save();
        res.redirect(`/dashboard/animals/${animalId}`)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rotta per eliminare un animale
router.delete('/dashboard/animals/:id/delete', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).json({ message: 'Animale non trovato' });
        }

        await animal.deleteOne({ _id: animal._id });
        res.redirect('/dashboard/animals')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router