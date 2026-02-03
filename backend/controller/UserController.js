import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // return res.status(400).json({
      //   errors: [{ field: "email", message: "Invalid email or password" }],
      // });
      if (!user) {
        return res.status(400).json({
          errors: [{ field: "email", message: "Invalid email ." }],
        });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      if (!user) {
        return res.status(400).json({
          errors: [{ field: "email", message: "Invalid email or password" }],
        });
      }
      //return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const user = async (req, res) => {
  try {
    res.status(200).json({
      message: "get User succesfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "error find.",
    });
  }
};
export { userCreate, login, user };
