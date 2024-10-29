import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";

const useFetchProducts = (page, limit, name) => {
  const fetchProducts = async () => {
    const effectiveLimit = name ? limit : 100; // Set high limit if no name

    const url = name
      ? `/products?page=${page}&limit=${effectiveLimit}&name=${name}`
      : `/products?page=${page}&limit=${effectiveLimit}`;

    return await api.get(url);
  };

  return useQuery(["products", page, limit, name], fetchProducts, {
    keepPreviousData: !name, // Keep the old data while fetching new
    onError: (error) => console.error("Error fetching products:", error),
  });
};

// const useFetchProducts = (page, limit, name, id = null) => {
//   const fetchProducts = async () => {
//     const url = id
//       ? `/products/${id}` // Fetch a single product if id is provided
//       : name
//       ? `/products?page=${page}&limit=${limit}&name=${name}`
//       : `/products?page=${page}&limit=${limit}`;

//     return await api.get(url);
//   };

//   return useQuery(["products", page, limit, name, id], fetchProducts, {
//     keepPreviousData: !name && !id, // Keep previous data while fetching new if no name or id
//     onError: (error) => console.error("Error fetching products:", error),
//   });
// };

const useProductDetails = (id) => {
  const fetchProductDetails = async () => await api.get(`/products/${id}`);

  return useQuery(["products", id], fetchProductDetails, {
    onError: (error) => console.error("Error fetching product details:", error),
  });
};

export { useFetchProducts, useProductDetails };
