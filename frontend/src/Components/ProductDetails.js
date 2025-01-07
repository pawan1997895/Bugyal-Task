import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetProductById } from "../api";
import { notify } from "../utils";

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const navigate = useNavigate();
  console.log("Product ID:", id);

  const fetchprdById = async () => {
    try {
      const { data } = await GetProductById(id);
      console.log(data);
      setProductDetails(data);
    } catch (error) {
      notify("Failed to fetch product, try again later", "error");
    }
  };

  useEffect(() => {
    fetchprdById();
  }, [id]);

  if (!productDetails) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Product Details</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col md-3">
              <img
                src={productDetails.image}
                alt={productDetails.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-9">
              <h4>{productDetails.name}</h4>
              <p>
                <strong>Price: </strong>
                {productDetails.price}
              </p>
              <p>
                <strong>Description: </strong>
                {productDetails.description}
              </p>
            </div>
          </div>
          <div className="d-flex gap-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/product")}
          >
            Back
          </button>

          <button
            className="btn btn-success"
          >
            Add to Cart
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
