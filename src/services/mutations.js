import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../configs/api";
import { useAuth } from "../contexts/AuthContext";

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);
  return useMutation({ mutationFn });
};

const useLogin = () => {
  const { login } = useAuth();
  const mutationFn = (data) => api.post("auth/login", data);
  return useMutation(mutationFn, {
    onSuccess: (response) => {
      const token = response.data?.token;
      if (token) {
        login(token); // Set token and update auth context
      }
    },
    onError: (error) => {
      console.log(error.response?.data?.message);
    },
  });
};

const useAddProduct = () => {
  const mutationFn = (data) => api.post("/products", data);
  return useMutation({ mutationFn });
};

const useUpdateProduct = () => {
  const mutationFn = ({ id, ...data }) => api.put(`/products/${id}`, data);
  return useMutation({ mutationFn });
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (id) => api.delete(`/products/${id}`);

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries("products"); // Refetch products after deletion
    },
    onError: (error) => {
      console.log(error.response?.data?.message || "Failed to delete product");
    },
  });
};

export {
  useRegister,
  useLogin,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
};
