const express = require('express')
const router = express.Router()
const path = require('path')
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
        const {
            name, species, breed, age, gender, description, arrivalDate, adopted, healthStatus, vaccinations,
            adoptionDate, notes, deathDate, microchipNumber, isSterilized, sterilizationDate, method, therapy,
        } = req.body;

        const photo = req.files.photo;
        const uploadPath = path.join(__dirname, '../public/uploads', photo.name);

        // Sposta il file nella cartella desiderata
        photo.mv(uploadPath, function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Errore nel caricamento del file');
            }
        });

        // Se il campo therapy non è un array (ad esempio, se c'è solo una terapia), trasformalo in un array
        const therapyData = Array.isArray(therapy) ? therapy : [];

        // Filtra le terapie vuote
        const filteredTherapies = therapyData
            .map(t => {
                // Controlla se t è definito e se ha una proprietà name
                if (t && t.name) {
                    return {
                        name: t.name.trim(),
                        dosage: t.dosage?.trim(),
                        startDate: t.startDate ? new Date(t.startDate) : null,
                        endDate: t.endDate ? new Date(t.endDate) : null,
                    };
                }
                return null;
            })
            .filter(t => t !== null);

        // Creazione di un nuovo documento Animal
        const savedAnimal = new Animal({
            name,
            species,
            breed,
            age,
            gender,
            description,
            arrivalDate,
            adopted: adopted || false,
            healthStatus,
            vaccinations: vaccinations ? vaccinations.split(',') : [],
            adoptionDate,
            notes,
            deathDate,
            microchipNumber,
            sterilization: {
                isSterilized: isSterilized || false,
                sterilizationDate,
                method,
            },
            therapy: filteredTherapies,
            photo: `/uploads/${photo.name}`, // Salva il percorso del file
        });
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