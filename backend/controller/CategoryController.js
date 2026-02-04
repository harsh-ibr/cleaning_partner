import Category from "../models/Category.js";

const module = "Category";
const getAll = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    const response = await Category.find().skip(skip).limit(limit);
    const total = await Category.countDocuments();
    const pages = Math.ceil(total / limit);
    return res.status(200).json({
      data: response,
      pagination: {
        limit,
        page,
        pages,
        total,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went to wrong.",
      error: error.message,
    });
  }
};
const create = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    const response = await Category.insertOne(data);
    return res.status(200).json({
      message: `${module} added successfully.`,
      data: response,
    });
  } catch (error) {
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
      message: "Something went to wrong.",
      error: error.message,
    });
  }
};
const getById = async (req, res) => {
  try {
    const response = await Category.findById(req.params.id);
    if (!response) {
      return res.status(404).json({
        error: `${module} is not found.`,
      });
    }
    return res.status(200).json({
      message: `${module} fetched successfully.`,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went to wrong.",
      error: error.message,
    });
  }
};
const updateById = async (req, res) => {
  try {
    const getById = await Category.findById(req.params.id);
    if (!getById) {
      return res.status(404).json({
        error: `${module} is not found.`,
      });
    }

    const data = {
      ...req.body,
    };

    const tag = await Category.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: `${module} updated successfully.`,
      data: tag,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went to wrong.",
      error: error.message,
    });
  }
};
const deleteById = async (req, res) => {
  try {
    const getByID = await Category.findById(req.params.id);
    if (!getByID) {
      return res.status(404).json({
        error: `${module} not found.`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      message: `${module} deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went to wrong.",
      error: error.message,
    });
  }
};
const deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "IDs required" });
    }

    const result = await Category.deleteMany({ _id: { $in: ids } });

    res.json({
      message: `${module} deleted successfully.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went to wrong.",
      error: error.message,
    });
  }
};

export { getAll, create, getById, updateById, deleteById, deleteMany };
