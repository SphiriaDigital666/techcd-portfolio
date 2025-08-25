const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserRole", UserRoleSchema, "user_role");
