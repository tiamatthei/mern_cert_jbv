const Pet = require("../models/pet_model");

const petController = {
  getAllPets: async (req, res) => {
    try {
      const pets = await Pet.find();
      res.json(pets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getPetById: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      res.json(pet);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createPet: async (req, res, io) => {
    const { name, type, description, skills } = req.body;
    const pet = new Pet({
      name,
      type,
      description,
      skills,
      likes: 0,
    });
    try {
      const newPet = await pet.save();
      io.emit("petsUpdated", await Pet.find()); // Emit event after adopting a pet
      res.status(201).json(newPet);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updatePet: async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      const { name, type, description, skills } = req.body;
      pet.name = name;
      pet.type = type;
      pet.description = description;
      pet.skills = skills;
      await pet.save();
      res.json(pet);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  adoptPet: async (req, res, io) => {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      await pet.deleteOne();
      io.emit("petsUpdated", await Pet.find()); // Emit event after adopting a pet
      console.log("Pet adopted (removed) successfully", await Pet.find());
      res.json({ message: "Pet adopted (removed) successfully" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  },

  likePet: async (req, res, io) => {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      pet.findOneAndUpdate({ likes: pet.likes + 1 });
      await pet.save();
      res.json({ message: "Pet liked successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = petController;
