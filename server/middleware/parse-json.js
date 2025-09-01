const parseJson = (fields = []) => {
  return (req, res, next) => {
    try {
      fields.forEach((field) => {
        if (req.body[field] && typeof req.body[field] === "string") {
          req.body[field] = JSON.parse(req.body[field]);
        }
      });
      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON in one of the fields: " + fields.join(", "),
      });
    }
  };
};

module.exports = parseJson;
