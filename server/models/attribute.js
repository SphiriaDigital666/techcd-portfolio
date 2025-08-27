const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    variations: [
      {
        type: String,
        default: "",
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attribute", attributeSchema);
