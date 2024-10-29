import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useProductDetails } from "../services/queries";
import { useUpdateProduct, useDeleteProduct } from "../services/mutations";
import editIcon from "../assets/icons/edit.svg";
import trashIcon from "../assets/icons/trash.svg";
import { IoMdArrowBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import styles from "./ProductDetailsPage.module.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetails(id);
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [productData, setProductData] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Populate `productData` once data is fetched
  useEffect(() => {
    if (data?.data) {
      setProductData({
        id: data.data.id, // Set the product ID here
        name: data.data.name,
        price: data.data.price,
        quantity: data.data.quantity,
      });
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError || !data?.data) return <p>Product not found</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    updateProduct(
      { id, ...productData },
      {
        onSuccess: () => {
          alert("Product updated successfully");
          setIsEditing(false);
        },
        onError: (error) => alert(`Failed to update product: ${error.message}`),
      }
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id, {
        onSuccess: () => {
          alert("Product deleted successfully");
          navigate("/products");
        },
        onError: (error) => alert(`Failed to delete product: ${error.message}`),
      });
    }
  };

  return (
    <div className={styles.productContainer}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        <IoMdArrowBack />
      </button>
      <ul>
        <li>
          <label>عنوان کالا</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </li>
        <li>
          <label>قیمت (تومان):</label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </li>
        <li>
          <label>تعداد:</label>
          <input
            type="text"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </li>
        <li>
          <label>شناسه کالا:</label>
          <input
            type="text"
            name="id"
            value={productData.id} // Displaying the ID
            disabled
          />
        </li>
      </ul>
      <div className={styles.actions}>
        {isEditing ? (
          <button className={styles.saveBtn} onClick={handleEdit}>
            <IoSaveOutline />
          </button>
        ) : (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            <img src={editIcon} alt="edit" width="20" height="20" />
          </button>
        )}
        <button className={styles.deleteBtn} onClick={handleDelete}>
          <img src={trashIcon} alt="delete" width="20" height="20" />
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
