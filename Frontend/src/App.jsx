import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout/Layout";
import LoadingScreen from "./Components/LoadingScreen";
import ErrorBoundary from "./Components/ErrorBoundary";

import AdminDashboard from "./Pages/AdminDashboard";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";

import HomePage from "./Pages/HomePages";
import NewArrivals from "./Components/NewArrivals";

import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";
import CategoryPage from "./Pages/CategoryPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";

import Wishlist from "./Components/Whislist";
import ScrollTop from "./Components/ScrollTop";
import Account from "./Components/AccountDetails/Account";

import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import ProtectedRoute from "./Components/ProtectedRoutes";
import OrderHistory from "./Components/AccountDetails/OrderHistory";
import OrderSuccessPage from "./Pages/OrderSuccessPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      {!isLoaded && (
        <LoadingScreen
          onComplete={() => setIsLoaded(true)}
        />
      )}

      <div
        style={{
          visibility: isLoaded ? "visible" : "hidden",
        }}
        className="bg-[#f8f7f5] min-h-screen"
      >

        <Router>

          <ScrollTop />

          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* OPEN THE APP AT category */}
            <Route path="/" element={<Navigate to="/category/men" replace />} />
            <Route path="/category" element={<Navigate to="/category/men" replace />} />

            <Route element={<Layout />}>
              {/* <Route path="" element={<HomePage />} /> */}
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Route>

            {/* ADMIN ROUTE */}
            <Route
              path="/admin"
              element={
                <ErrorBoundary>
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                </ErrorBoundary>
              }
            />

            {/* USER ROUTES */}
            <Route
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            >
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Route>


            {/* NOT FOUND */}
            <Route path="*" element={<NotFound />} />


          </Routes>

        </Router>

      </div>
    </>
  );
};

export default App;