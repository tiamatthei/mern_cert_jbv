const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet_controller");
const io = require("../socketConfig").getIO();

// Routes
router.get("/", petController.getAllPets);
router.get("/:id", petController.getPetById);
router.post("/", (req, res) => {
  petController.createPet(req, res, io); // Pass io to createPet method
});
router.put("/:id", (req, res) => {
  petController.updatePet(req, res, io); // Pass io to updatePet method
});
router.delete("/:id/adopt", (req, res) => {
  petController.adoptPet(req, res, io); // Pass io to adoptPet method
});
router.put("/:id/like", (req, res) => {
  petController.likePet(req, res, io); // Pass io to likePet method
});

module.exports = router;
