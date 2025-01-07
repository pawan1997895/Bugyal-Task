const { createProduct, getAllProduct, getProductById, deleteEmployeeById, updateProductById } = require('../Controllers/ProductController');
const { cloudinaryFileUploader } = require('../Middleware/FileUploader');

const routes = require('express').Router();

routes.get('/', getAllProduct);

routes.post('/', cloudinaryFileUploader.single('image'), createProduct)
routes.put('/:id', cloudinaryFileUploader.single('image'), updateProductById)

routes.get('/:id', getProductById);

routes.delete('/:id', deleteEmployeeById);

module.exports = routes;