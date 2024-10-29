import React from "react";
import { Link } from "react-router-dom";
import editIcon from "../assets/icons/edit.svg";
import trashIcon from "../assets/icons/trash.svg";

import styles from "./ProductList.module.css"; // Add your styles if needed

const ProductList = ({
  products,
  selectedProducts,
  handleCheckboxChange,
  editProductHandler,
  openDeleteModal,
}) => {
  return (
    <div className={styles.list}>
      <ul className={styles.listHeader}>
        <li></li>
        <li>نام کالا</li>
        <li>موجودی</li>
        <li>قیمت</li>
        <li>شناسه کالا</li>
        <li></li>
      </ul>

      {products.map((product) => (
        <ul key={product.id} className={styles.listBody}>
          <li>
            <input
              id={product.name}
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <label htmlFor={product.name}></label>
          </li>
          <li>
            <p>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </p>
          </li>
          {/* <li>{product.quantity > 0 ? `موجود` : `ناموجود`}</li> */}
          <li>{product.quantity}</li>
          <li>
            <p>{product.price} تومان</p>
          </li>
          <li>
            <p>{product.id}</p>
          </li>
          <li>
            <button onClick={() => editProductHandler(product)}>
              <img src={editIcon} alt="close" width="20" height="20" />
            </button>
            <button onClick={openDeleteModal}>
              <img src={trashIcon} alt="close" width="20" height="20" />
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
