import User from "../models/User.js";

const userCreate = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    const response = await User.insertOne(data);
    return res.status(200).json({
      message: "User created successfully.",
      data: response,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        errors: [
          {
            field: "email",
            message: "The email field already exist.",
          },
        ],
      });
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { userCreate };
