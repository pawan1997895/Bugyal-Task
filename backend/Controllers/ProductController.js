const productModel = require("../Models/ProductModel");

const createProduct = async (req, res) => {
  try {
    const body = req.body;
    body.image = req?.file ? req?.file?.path : null;
    const prd = new productModel(body);
    await prd.save();
    res.status(201).json({
      message: "Product created",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { id } = req.params;

    let updateData = {
      name,
      price,
      description,
      updatedAt: new Date(),
    };

    if (req.file) {
      updateData.image = req.file.path;
    }
    const updateProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateProduct) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      message: "Product updated",
      success: true,
      data: updateProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page-1) * limit;

    let searchCriteria = {}
    if(search){
        searchCriteria = {
            name: {
                $regex: search,
                $options: 'i'
            }
        }
    }

    const totalProduct = await productModel.countDocuments(searchCriteria)

    const prds = await productModel.find(searchCriteria)
    .skip(skip)
    .limit(limit)
    .sort({updatedAt: -1});

    const totalPages = Math.ceil(totalProduct / limit);
    res.status(200).json({
      message: " All Product",
      success: true,
      data: {
        products: prds,
        pagination: {
            totalProduct,
            currentPage: page,
            totalPages,
            pageSize: limit
        }
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const prd = await productModel.findOne({ _id: id });
    res.status(200).json({
      message: "Get Product Details",
      success: true,
      data: prd,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const prd = await productModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Product Deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  deleteEmployeeById,
  updateProductById,
};
