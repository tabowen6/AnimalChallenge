const express = require("express");
const router = express.Router();
const { Animal } = require("../models");
const validateJWT = require("../middleware/validate-jwt");

router.post("/create", async (req, res) => {
    let { name, legNumber, predator } = req.body.animal;

    try {
        const newAnimal = await Animal.create({
            name,
            legNumber,
            predator
        });

        res.status(201).json({
            message: "Animal successfully saved",
            animal: newAnimal
        })
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.get("/", async (req, res) => {
    try {
        const allAnimals = await Animal.findAll();
        res.status(200).json(
            allAnimals
        )
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.delete("/delete/:name", async (req, res) => {
    //or to do it by Id...
    //const animalId = req.params.id;
    //await Animal.destroy({ where: {id: animalId}})
    const deleteAnimal = req.params.name;

    try {
        let animal = await Animal.findOne({
            where: {
                name: deleteAnimal
            }
        });

        if (animal) {
            const query = {
                where: {
                    id: animal.id,
                },
            };

            await Animal.destroy(query);

        res.status(201).json({
            message: `${deleteAnimal} successfully deleted`,
        });
    } else {
        res.status(200).json({
            message: "Animal not found"
        })
    }

    } catch (error) {
        res.status(500).json({ error })
    }
});

router.put("/update/:id", async (req, res) => {
    const { name, legNumber, predator } = req.body.animal;

    const query = {
        where: {
            id: req.params.id
        }
    };

    const updatedAnimal = {
        name: name,
        legNumber: legNumber,
        predator: predator
    };
    
    try {
        const update = await Animal.update(updatedAnimal, query);
        res.status(200).json({
            message: "Animal successfully updated",
            update
        });
    } catch (err) {
        res.status(500).json({ error })
    }
});

module.exports = router;