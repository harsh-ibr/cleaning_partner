import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required."],
      minlength: [3, "The name must be at least 3 characters"],
      maxlength: [50, "The name must be at most 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      minlength: [3, "The email must be at least 3 characters"],
      maxlength: [50, "The name must be at most 50 characters"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "cleaner"],
      default: "user",
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [8, "The password must be at least 8 characters"],
      maxlength: [12, "The password must be at most 12 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //   next();
});

export default mongoose.model("User", userSchema);
