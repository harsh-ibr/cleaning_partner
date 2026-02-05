import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name  is required."],
      minlength: [3, "The name must be at least 3 characters"],
      maxlength: [50, "The name must be at most 50 characters"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    status: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    description: {
      type: String,
      trim: true,
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
  {
    timestamps: true,
  },
);

categorySchema.statics.getAll = function () {
  return this.find().sort({ name: 1 }); // get all data
};

categorySchema.pre("save", async function (next) {
  if (!this.isModified("name")) return "";

  // Basic slug
  let slug = this.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  // Check uniqueness
  let slugExists = await mongoose.models.Category.findOne({ slug });

  let counter = 1;
  while (slugExists) {
    slugExists = await mongoose.models.Category.findOne({
      slug: `${slug}-${counter}`,
    });
    counter++;
  }

  this.slug = counter === 1 ? slug : `${slug}-${counter}`;
  //   next();
});

export default mongoose.model("Category", categorySchema);
