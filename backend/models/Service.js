import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "The category is required."],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "The category is required.",
      },
    },
    price: {
      type: Number,
      required: [true, "The price is required."],
    },
    time: {
      type: Number,
      required: [true, "The time is required."],
    },
    duration: {
      type: String,
      enum: ["minute", "hour", "day"],
      required: [true, "The duration is required."],
    },
    status: {
      type: String,
      required: [true, "The status is required."],
      enum: ["active", "inactive"],
      default: "active",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Service", serviceSchema);
