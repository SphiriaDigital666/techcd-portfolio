const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");

exports.createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phoneNo,
      password,
      shippingInfo,
    } = req.body;

    // Check for existing customer with same phone number, email, or username
    const existingCustomer = await Customer.findOne({
      $or: [
        { phoneNo: phoneNo },
        { email: email },
        { username: username }
      ]
    });

    if (existingCustomer) {
      let errorMessage = "Customer already exists with ";
      const conflicts = [];
      
      if (existingCustomer.phoneNo === phoneNo) {
        conflicts.push("phone number");
      }
      if (existingCustomer.email === email) {
        conflicts.push("email address");
      }
      if (existingCustomer.username === username) {
        conflicts.push("username");
      }
      
      errorMessage += conflicts.join(", ");
      
      return res.status(400).json({ 
        success: false, 
        message: errorMessage,
        field: conflicts.length === 1 ? conflicts[0] : "multiple"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({
      firstName,
      lastName,
      username,
      email,
      phoneNo,
      password: hashedPassword,
      shippingInfo,
    });

    await customer.save();
    const data = customer.toObject();
    delete data.password;

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data,
    });
  } catch (error) {
    // Handle MongoDB duplicate key errors with user-friendly messages
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      let message = "This ";
      
      switch (field) {
        case 'phoneNo':
          message += "phone number is already registered";
          break;
        case 'email':
          message += "email address is already registered";
          break;
        case 'username':
          message += "username is already taken";
          break;
        default:
          message += `${field} already exists`;
      }
      
      return res.status(400).json({ 
        success: false, 
        message: message,
        field: field
      });
    }
    
    // Handle other validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: messages.join(', '),
        errors: messages
      });
    }
    
    // Handle other errors
    res.status(500).json({ 
      success: false, 
      message: "An error occurred while creating the customer. Please try again." 
    });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().select("-password");
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select("-password");

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    const { field } = req.query;

    switch (field) {
      case "profile": {
        const { firstName, lastName, role } = req.body;

        customer.firstName = firstName;
        customer.lastName = lastName;
        customer.role = role;
        break;
      }

      case "username": {
        const { username, password } = req.body;

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        customer.username = username;
        break;
      }

      case "email": {
        const { email, password } = req.body;

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        customer.email = email;
        break;
      }

      case "password": {
        const { password, newPassword } = req.body;

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        customer.password = hashedPassword;
        break;
      }

      case "phoneNo": {
        const { phoneNo, password } = req.body;

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid password" });
        }

        customer.phoneNo = phoneNo;
        break;
      }

      case "address": {
        const { shippingInfo } = req.body;

        customer.shippingInfo = shippingInfo;
        break;
      }
    }

    await customer.save();
    const updatedCustomer = customer.toObject();
    delete updatedCustomer.password;

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    // Handle MongoDB duplicate key errors with user-friendly messages
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      let message = "This ";
      
      switch (field) {
        case 'phoneNo':
          message += "phone number is already registered";
          break;
        case 'email':
          message += "email address is already registered";
          break;
        case 'username':
          message += "username is already taken";
          break;
        default:
          message += `${field} already exists`;
      }
      
      return res.status(400).json({ 
        success: false, 
        message: message,
        field: field
      });
    }
    
    // Handle other validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: messages.join(', '),
        errors: messages
      });
    }
    
    // Handle other errors
    res.status(500).json({ 
      success: false, 
      message: "An error occurred while updating the customer. Please try again." 
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
