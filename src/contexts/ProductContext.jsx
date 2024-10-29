import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchProducts } from "../services/queries";
import {
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../services/mutations";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { mutate: addProduct } = useAddProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const { data, isLoading, isError } = useFetchProducts(
    page,
    limit,
    searchQuery
  );

  const totalProducts = data?.data?.totalProducts || 0; // Update totalProducts
  const totalPages = Math.ceil(totalProducts / limit); // Calculate total pages based on totalProducts

  const productsData = data?.data?.data || [];

  // If there's a search query, filter products, else use the original productsData
  const filteredProducts = searchQuery
    ? productsData.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : productsData;

  // Paginate the products based on filtered results
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  //   console.log(totalProducts, totalPages, paginatedProducts, filteredProducts);
  const value = {
    products: paginatedProducts,
    isLoading,
    isError,
    addProduct,
    updateProduct,
    deleteProduct,
    selectedProducts,
    setSelectedProducts,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    limit,
    totalPages,
    totalProducts: filteredProducts.length, // تعداد کل محصولات فیلتر شده
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
