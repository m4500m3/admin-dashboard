import { useState, useEffect, useRef } from "react";
import { useAddProduct, useUpdateProduct } from "../services/mutations";
import { useQueryClient } from "@tanstack/react-query";
import inputs from "../constants/inputs";
import styles from "./ProductForm.module.css";

function ProductForm({ productToEdit, onClose, isOpen }) {
  const queryClient = useQueryClient();
  const { mutate: addMutate, data, isLoading } = useAddProduct();
  const { mutate: updateMutate } = useUpdateProduct();

  const modalRef = useRef(null);

  // Close modal if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const [productForm, setProductForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    if (productToEdit) {
      setProductForm(productToEdit);
    }
  }, [productToEdit]);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: name === "price" || name === "quantity" ? Number(value) : value, // Convert to number if price or quantity
    }));
  };

  const addOrUpdateHandler = (event) => {
    event.preventDefault();
    const { name, price, quantity } = productForm;
    if (productToEdit) {
      updateMutate(
        { id: productToEdit.id, name, price, quantity },
        {
          onSuccess: (data) => {
            console.log(data.data.message);
            queryClient.invalidateQueries("products"); // Refetch products
            onClose();
          },
          onError: (error) => console.log(error.response.data.message),
        }
      );
    } else {
      addMutate(
        { name, price, quantity },
        {
          onSuccess: (data) => {
            console.log(data.data.message);
            queryClient.invalidateQueries("products"); // Refetch products
            onClose();
          },
          onError: (error) => console.log(error.response.data.message),
        }
      );
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={addOrUpdateHandler} ref={modalRef}>
        <h1>{productToEdit ? "ویرایش محصول" : "ایجاد محصول جدید"}</h1>
        <ul>
          {inputs.map((input, index) => (
            <li key={index}>
              <label htmlFor={input.name}>{input.placeholder}</label>
              <input
                type={input.type}
                id={input.name}
                placeholder={input.placeholder}
                name={input.name}
                value={productForm[input.name]}
                onChange={changeHandler}
              />
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <button
            className={styles.confirmBtn}
            type="submit"
            disabled={isLoading}
          >
            {productToEdit ? `ثبت اطلاعات جدید` : `ایجاد`}
          </button>
          <button className={styles.cancelBtn} type="button" onClick={onClose}>
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
