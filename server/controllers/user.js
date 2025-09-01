const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, phoneNo, password, role } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      phoneNo,
      password: hashedPassword,
      role,
    });

    await user.save();
    const data = user.toObject();
    delete data.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // populate role name
    const users = await User.find()
      .select("-password")
      .populate("role", "name");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("role", "name");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { field } = req.query;

    switch (field) {
      case "profile": {
        const { firstName, lastName, role } = req.body;

        if (!firstName || !lastName || !role) {
          return res.status(400).json({
            success: false,
            message:
              "firstName, lastName, and role are required for profile update",
          });
        }

        // Validate that the role exists
        const UserRole = require("../models/user-role");
        const roleExists = await UserRole.findById(role);
        if (!roleExists) {
          return res.status(400).json({
            success: false,
            message: "Invalid role ID provided",
          });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.role = role;
        break;
      }

      case "username": {
        const { username, password } = req.body;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        user.username = username;
        break;
      }

      case "email": {
        const { email, password } = req.body;

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        user.email = email;
        break;
      }

      case "password": {
        const { password, newPassword } = req.body;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        break;
      }

      case "phoneNo": {
        const { phoneNo, password } = req.body;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        user.phoneNo = phoneNo;
        break;
      }

      default: {
        return res.status(400).json({
          success: false,
          message: `Invalid field: ${field}. Supported fields are: profile, email, username, password, phoneNo`,
        });
      }
    }

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
