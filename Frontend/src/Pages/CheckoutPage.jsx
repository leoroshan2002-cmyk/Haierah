import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import LoginSection from "../Components/CheckoutDetails/LoginSection";
import AddressSection from "../Components/CheckoutDetails/AddressSection";
import PaymentSection from "../Components/CheckoutDetails/PaymentMethod";
//import CardDetails from "../Components/CreditCardDetails";
import DeliverySection from "../Components/CheckoutDetails/DeliverySection";
import OrderReview from "../Components/OrderReview";
import OrderSummary from "../Components/OrderSummary";
import PageBack from "../Components/CommonDetails/PageBack";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user, isAuthReady } = useAuth();
  const { cart, isCartReady } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash on Delivery");
  const [selectedDelivery, setSelectedDelivery] = useState({ id: "standard", title: "Standard Delivery", time: "3 - 5 Business Days", price: "FREE" });
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    if (!isAuthReady) return;

    if (!user) {
      navigate("/login", {
        state: { from: { pathname: "/checkout" } },
        replace: true,
      });
      return;
    }
  }, [isAuthReady, user, navigate]);

  useEffect(() => {
    if (!isCartReady || cart.length === 0) return;

    gsap.from(".checkout-title", {
      y: -40,
      opacity: 100,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".left-side", {
      x: 0,
      y: 24,
      opacity: 100,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".right-side", {
      x: 0,
      y: 24,
      opacity: 100,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });
  }, [isCartReady, cart.length]);

  if (!isAuthReady || !user) {
    return (
      <section className="min-h-[calc(100dvh-80px)] bg-[#faf8f6] px-4 py-8 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="mb-12 space-y-3">
            <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
                <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-2xl animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isCartReady) {
    return (
      <section className="min-h-[calc(100dvh-80px)] bg-[#faf8f6] px-4 py-8 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="mb-12 space-y-3">
            <div className="h-12 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-10 w-full bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
                <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-2xl animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="min-h-[calc(100dvh-80px)] bg-[#faf8f6] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Add a product before continuing to checkout.</p>
          <Link to="/cart" className="bg-[#0d2746] text-white px-8 py-4 rounded-full hover:bg-black duration-300">
            Go to cart
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen overflow-x-hidden bg-[#faf8f6] px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto mb-6 max-w-7xl">
    <PageBack />
  </div>
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="checkout-title mb-8 sm:mb-12"
        >
          <h1 className="text-4xl font-serif font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Checkout
          </h1>

          <p className="mt-3 text-base text-gray-500 sm:text-lg">
            Complete your purchase securely.
          </p>
        </motion.div>

        {/* Main Grid */}

        <div className="grid w-full min-w-0 items-start gap-6 lg:grid-cols-12 lg:gap-10">

          {/* LEFT SIDE */}

          <motion.div
            className="left-side w-full min-w-0 lg:col-span-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {orderCompleted ? (
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-lg sm:p-12">
                <h2 className="mb-4 text-3xl font-serif font-bold sm:text-4xl">Order received</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Your checkout details are cleared and confirmation is on its way.
                </p>
                <p className="text-gray-500">
                  Thank you for your purchase. We will email your receipt and shipping information shortly.
                </p>
              </div>
            ) : (
              <div className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white text-left shadow-lg">

                <LoginSection />

                <AddressSection />

                <PaymentSection selectedMethodValue={selectedPaymentMethod} onSelectMethod={setSelectedPaymentMethod} />

                {/* <CardDetails /> */}

                <DeliverySection onSelectDelivery={setSelectedDelivery} />

                <OrderReview />

              </div>
            )}
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            className="right-side w-full min-w-0 lg:col-span-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="lg:sticky lg:top-28">

              <OrderSummary
                selectedPaymentMethod={selectedPaymentMethod}
                selectedDelivery={selectedDelivery}
                onPaymentError={(message) => console.warn(message)}
                onOrderComplete={() => setOrderCompleted(true)}
              />

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}