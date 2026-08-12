import React, { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout/Layout";
import LoadingScreen from "./Components/LoadingScreen";
import ErrorBoundary from "./Components/ErrorBoundary";

import AdminProtectedRoute from "./Components/AdminProtectedRoute";

import Wishlist from "./Components/Whislist";
import ScrollTop from "./Components/ScrollTop";
import Account from "./Components/AccountDetails/Account";

import ProtectedRoute from "./Components/ProtectedRoutes";
import OrderHistory from "./Components/AccountDetails/OrderHistory";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const NewArrivals = lazy(() => import("./Components/NewArrivals"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const CategoryPage = lazy(() => import("./Pages/CategoryPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const CheckoutPage = lazy(() => import("./Pages/CheckoutPage"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const OrderSuccessPage = lazy(() => import("./Pages/OrderSuccessPage"));
const BestSellers = lazy(() => import("./Components/footer/BestSellers"));
const ShippingReturns = lazy(() => import("./Components/footer/ShippingReturns"));
const PrivacyPolicy = lazy(() => import("./Components/footer/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./Components/footer/TermsOfService"));
const Contact = lazy(() => import("./Components/footer/Contact"));
const BrandStory = lazy(() => import("./Components/footer/BrandStory"));
const Sustainability = lazy(() => import("./Components/footer/Sustainability"));
const Press = lazy(() => import("./Components/footer/Press"));
const StoreLocator = lazy(() => import("./Components/footer/StoreLocator"));

const LazyRoute = ({ component: Component }) => (
  <Suspense fallback={<div className="min-h-screen bg-[#f8f7f5]" /> }>
    <Component />
  </Suspense>
);

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

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
            <Route path="/login" element={<LazyRoute component={Login} />} />
            <Route path="/register" element={<LazyRoute component={Register} />} />

            {/* OPEN THE APP AT category */}
            <Route path="/" element={<Navigate to="/category/men" replace />} />
            <Route
              path="/category"
              element={<Navigate to="/category/men" replace />}
            />

            <Route element={<Layout />}>
              <Route path="/new-arrivals" element={<LazyRoute component={NewArrivals} />} />
              <Route path="/best-sellers" element={<LazyRoute component={BestSellers} />} />
              <Route path="/shipping-returns" element={<LazyRoute component={ShippingReturns} />} />
              <Route path="/privacy-policy" element={<LazyRoute component={PrivacyPolicy} />} />
              <Route path="/terms-of-service" element={<LazyRoute component={TermsOfService} />} />
              <Route path="/contact" element={<LazyRoute component={Contact} />} />
              <Route path="/brand-story" element={<LazyRoute component={BrandStory} />} />
              <Route path="/sustainability" element={<LazyRoute component={Sustainability} />} />
              <Route path="/press" element={<LazyRoute component={Press} />} />
              <Route path="/store-locator" element={<LazyRoute component={StoreLocator} />} />
              <Route path="/products" element={<LazyRoute component={ProductsPage} />} />
              <Route path="/category/:slug" element={<LazyRoute component={CategoryPage} />} />
              <Route path="/product/:id" element={<LazyRoute component={ProductPage} />} />
            </Route>

            {/* ADMIN ROUTE */}
            <Route
              path="/admin"
              element={
                <ErrorBoundary>
                  <AdminProtectedRoute>
                    <LazyRoute component={AdminDashboard} />
                  </AdminProtectedRoute>
                </ErrorBoundary>
              }
            />

            {/* USER ROUTES */}
            <Route element={<Layout />}>
              <Route path="/checkout" element={<LazyRoute component={CheckoutPage} />} />
            </Route>

            <Route
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            >
              <Route path="/cart" element={<LazyRoute component={CartPage} />} />
              <Route path="/order-success" element={<LazyRoute component={OrderSuccessPage} />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Route>

            {/* NOT FOUND */}
            <Route path="*" element={<LazyRoute component={NotFound} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
