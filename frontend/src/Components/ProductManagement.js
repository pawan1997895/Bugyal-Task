import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { DeleteProductById, GetAllProducts } from "../api";
import { ToastContainer } from "react-toastify";
import AddProduct from "./AddProduct";
import { notify } from "../utils";

const ProductManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [updatePrdObj, setUpdatePrdObj] = useState(null);
  const [productData, setProductData] = useState({
    products: [],
    pagination: {
      totalProduct: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 5,
    },
  });

  const fetchProduct = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await GetAllProducts(search, page, limit);
      setProductData(data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleUpdateProduct = (prdObj) => {
    console.log("Update Obj", prdObj);
    setUpdatePrdObj(prdObj);
    setShowModal(true);
  };

  const handleDeleteProduct = async (prd) => {
    try {
      const { success, message } = await DeleteProductById(prd._id);
      if (success) {
  
        notify(message, "success");
  

        setProductData((prevState) => ({
          ...prevState,
          products: prevState.products.filter((product) => product._id !== prd._id),
          pagination: {
            ...prevState.pagination,
            totalProduct: prevState.pagination.totalProduct - 1,  
          },
        }));
      } else {
        notify(message, "error");
      }
    } catch (err) {
      console.log("Error", err);

      notify(err, "error");
    }
  };
  

  const handleSearch = (e) => {
    const term = e.target.value;
    fetchProduct(term)
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Product Management</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p3" style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => handleAddProduct()}
            >
              Add
            </button>

            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Product.."
              className="form-control w-50"
            />
          </div>

          <ProductTable
            handleDeleteProduct={handleDeleteProduct}
            handleUpdateProduct={handleUpdateProduct}
            fetchProduct={fetchProduct}
            products={productData.products}
            pagination={productData.pagination}
          />

          <AddProduct
            updatePrdObj={updatePrdObj}
            fetchProduct={fetchProduct}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default ProductManagement;
