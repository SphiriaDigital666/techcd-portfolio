const Attribute = require("../models/attribute");

exports.createAttribute = async (req, res) => {
  try {
    const { name, variations } = req.body;
    const attribute = new Attribute({ name, variations });
    await attribute.save();

    res.status(201).json(attribute);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating attribute", error: error.message });
  }
};

exports.getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().sort({ createdAt: -1 });
    res.status(200).json(attributes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attributes", error: error.message });
  }
};

exports.getAttributeById = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await Attribute.findById(id);

    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });

    res.status(200).json(attribute);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching attribute", error: error.message });
  }
};

exports.updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, variations } = req.body;

    const attribute = await Attribute.findByIdAndUpdate(
      id,
      { name, variations },
      { new: true, runValidators: true }
    );

    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });

    res.status(200).json(attribute);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating attribute", error: error.message });
  }
};

exports.deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const attribute = await Attribute.findByIdAndDelete(id);

    if (!attribute)
      return res.status(404).json({ message: "Attribute not found" });

    res.status(200).json({ message: "Attribute deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting attribute", error: error.message });
  }
};
