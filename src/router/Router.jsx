import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import ProductsPage from "../pages/ProductsPage ";
import ProductDetailsPage from "../pages/ProductDetailsPage ";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useAuth } from "../contexts/AuthContext";

function Router() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route
            path="/products"
            element={token ? <ProductsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!token ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="/signup"
            element={!token ? <RegistrationPage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/products/:id"
            element={token ? <ProductDetailsPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
