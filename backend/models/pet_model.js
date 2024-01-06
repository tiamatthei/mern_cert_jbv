const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  skills: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length >= 0 && v.length <= 3;
      },
      message: "A pet can have between 0 and 3 skills.",
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
