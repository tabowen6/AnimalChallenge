const express = require("express");
const router = express.Router();
const { Animal } = require("../models");

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
})

router.delete("/delete/:name", async (req, res) => {
    const deleteAnimal = req.params.name;

    try {
        const query = {
            where: {
                name: deleteAnimal,
            }
        };

        await Animal.destroy(query);

        res.status(201).json({
            message: `${deleteAnimal} successfully deleted`,
        })
    } catch (error) {
        res.status(500).json({ error })
    }
});

router.put("/update/:id", async (req, res) => {
    const { name, legNumber, predator } = req.body.animal;
    const animalId = req.params.id;

    const query = {
        where: {
            id: animalId
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