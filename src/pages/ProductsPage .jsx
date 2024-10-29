import React, { useState, useEffect } from "react";
import { useProducts } from "../contexts/ProductContext";
import Loader from "../components/Loader";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import ProductList from "../components/ProductList";
import settingIcon from "../assets/icons/setting.svg";
import UserInfo from "../components/UserInfo";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const {
    products,
    isLoading,
    isError,
    deleteProduct,
    selectedProducts,
    setSelectedProducts,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    limit,
    totalPages,
    totalProducts,
  } = useProducts();

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // Define the handleCheckboxChange function
  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(id)) {
        // If already selected, remove it
        return prevSelected.filter((productId) => productId !== id);
      } else {
        // Otherwise, add it to the selected array
        return [...prevSelected, id];
      }
    });
  };

  // Effect to reload products when navigating back
  useEffect(() => {
    if (products.length === 0 && page > 1) {
      setPage((prevPage) => prevPage - 1); // Go back a page if there are no products
    }
  }, [products.length, page, setPage]);

  if (isError) return <p>بارگیری محصولات با خطا مواجه شد 😏</p>;

  const editProductHandler = (product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDeleteHandler = () => {
    selectedProducts.forEach((id) => {
      deleteProduct(id, {
        onSuccess: () => {
          setSelectedProducts((prev) =>
            prev.filter((productId) => productId !== id)
          );
        },
      });
    });
    closeModal();
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.searchContainer}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <UserInfo />
      </div>

      {isFormOpen && (
        <ProductForm
          productToEdit={productToEdit}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setProductToEdit(null);
          }}
        />
      )}
      <div className={styles.row}>
        <div className={styles.listTitle}>
          <img src={settingIcon} alt="close" width="30" height="30" />
          <h1>مدیریت کالا</h1>
        </div>
        <div className={styles.actions}>
          <button
            disabled={!selectedProducts.length}
            className={styles.deleteSelectedBtn}
            onClick={openDeleteModal}
          >
            حذف انتخابی
          </button>

          <button
            className={styles.addBtn}
            onClick={() => {
              setIsFormOpen(true);
              setSearchQuery("");
            }}
          >
            افزودن محصول
          </button>
        </div>
      </div>
      {/* List products */}
      {products.length > 0 ? (
        <ProductList
          products={products}
          selectedProducts={selectedProducts}
          handleCheckboxChange={handleCheckboxChange}
          editProductHandler={editProductHandler}
          openDeleteModal={openDeleteModal}
        />
      ) : (
        <p>محصولی وجود ندارد.</p>
      )}

      {/* Pagination Controls */}
      {totalProducts > limit && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        message={
          selectedProducts.length > 0
            ? "آیا از حذف این محصولات مطمئنید؟"
            : "آیا از حذف این محصول مطمئنید؟"
        }
        onConfirm={confirmDeleteHandler}
        onCancel={closeModal}
      />
    </>
  );
};

export default ProductsPage;
