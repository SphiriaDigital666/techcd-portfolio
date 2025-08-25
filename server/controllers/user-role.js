const UserRole = require("../models/user-role");

exports.createUserRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new UserRole({ name });
    await role.save();

    res.status(201).json(role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating role", error: error.message });
  }
};

exports.getUserRoles = async (req, res) => {
  try {
    const roles = await UserRole.find().sort({ createdAt: -1 });
    res.status(200).json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: error.message });
  }
};

exports.getUserRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await UserRole.findById(id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.status(200).json(role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching role", error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await UserRole.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.status(200).json(role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating role", error: error.message });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await UserRole.findByIdAndDelete(id);

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: error.message });
  }
};
