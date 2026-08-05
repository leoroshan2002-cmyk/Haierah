import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import LoginSection from "../Components/CheckoutDetails/LoginSection";
import AddressSection from "../Components/CheckoutDetails/AddressSection";
import PaymentSection from "../Components/CheckoutDetails/PaymentMethod";
//import CardDetails from "../Components/CreditCardDetails";
import DeliverySection from "../Components/CheckoutDetails/DeliverySection";
import OrderReview from "../Components/OrderReview";
import OrderSummary from "../Components/OrderSummary";
import PageBack from "../Components/CommonDetails/PageBack";

export default function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    gsap.from(".checkout-title", {
      y: -40,
      opacity: 100,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".left-side", {
      x: -80,
      opacity: 100,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".right-side", {
      x: 80,
      opacity: 100,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="min-h-screen bg-[#faf8f6] py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6">
    <PageBack />
  </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="checkout-title mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900">
            Checkout
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Complete your purchase securely.
          </p>
        </motion.div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT SIDE */}

          <motion.div
            className="left-side lg:col-span-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-200">

              <LoginSection />

              <AddressSection />

              <PaymentSection selectedMethodValue={selectedPaymentMethod} onSelectMethod={setSelectedPaymentMethod} />

              {/* <CardDetails /> */}

              <DeliverySection />

              <OrderReview />

            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            className="right-side lg:col-span-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="sticky top-28">

              <OrderSummary selectedPaymentMethod={selectedPaymentMethod} onPaymentError={(message) => console.warn(message)} />

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}