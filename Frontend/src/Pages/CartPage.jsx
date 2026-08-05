import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Share2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useCart } from "../Context/CartContext";
import RecommendationPage from "../Components/RecommendationPage";
import PageBack from "../Components/CommonDetails/PageBack";
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  useEffect(() => {
    gsap.from(".cart-left", {
      x: -80,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".cart-right", {
      x: 80,
      opacity: 1,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });
  }, []);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.05;
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping + tax;
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#faf8f6]">
        <h1 className="text-5xl font-serif font-bold mb-4">
          Your Cart
        </h1>

        <p className="text-gray-500 mb-8">
          Your shopping cart is empty.
        </p>

        <Link
          to="/products"
          className="bg-[#0d2746] text-white px-8 py-4 rounded-full hover:bg-black duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-[#faf8f6] min-h-screen py-12">

  {/* Back Button */}
  <div className="max-w-6xl mx-auto px-6 mb-4">
    <PageBack />
  </div>

  <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 w-6xl ">

          <h1 className="text-6xl font-serif">
            My Cart
          </h1>

          <div className="flex gap-4 mt-6 md:mt-0">

            <button
              className="border rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-gray-100 transition"
            >
              Share Cart
              <Share2 size={18} />
            </button>

            <button
              className="bg-black text-white rounded-xl px-8 py-3 hover:bg-neutral-800 transition"
            >
              BUY ALL
            </button>

          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-4 ml-10 p-2">

          {/* LEFT */}


          <div className="lg:col-span-2 cart-left">

            {/* <h1 className="text-5xl font-serif font-bold">
              Your Cart
            </h1>

            <p className="text-gray-500 mt-2 mb-10">
              {cart.length} items in your cart
            </p> */}

            <div className="space-y-4">

              {cart.map((item) => (

                <motion.div
                  key={item.cartItemKey || item.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex gap-12 border-t pt-6"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-36 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <div>

                        <h2 className="text-3xl font-serif font-semibold">
                          {item.name}
                        </h2>

                        <p className="text-gray-600 mt-2">
                          Size : {item.selectedSize || "M"}
                        </p>

                        <p className="text-gray-600">
                          Color : {item.selectedColor || item.color || "Cream"}
                        </p>

                        <div className="flex items-center gap-3 mt-3">

                          <span>Quantity :</span>

                          <div className="flex  rounded-full overflow-hidden">

                            <button
                              onClick={() =>
                                updateQuantity(item.cartItemKey || item.id, item.qty - 1)
                              }
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              -
                            </button>

                            <span className="px-4 py-1">
                              {item.qty}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.cartItemKey || item.id, item.qty + 1)
                              }
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>

                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartItemKey || item.id)}
                            className="text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                        <button className="underline mt-4 text-sm">
                          Save for Later
                        </button>

                      </div>

                      <div className="text-3xl font-serif font-bold">
                        ₹
                        {(item.price * item.qty).toFixed(2)}
                      </div>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>



          </div>


          {/* RIGHT */}


          <div className="cart-right">

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-8 shadow w-[350px]"
            >

              <h2 className="text-4xl font-serif font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 text-lg">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{subtotal > 500 ? "Free" : "₹40"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-3xl font-bold">

                <span>Total</span>

                <span>₹{total.toFixed(2)}</span>

              </div>

              <div className="flex mt-8 gap-3">

                <input
                  placeholder="Promo Code"
                  className="flex-1  rounded-xl px-4 py-3 outline-none"
                />

                <button className="bg-[#0d2746] text-white px-4 rounded-xl">
                  Apply
                </button>

              </div>

              <Link
                to="/checkout"
                className="block mt-8 text-center bg-[#0d2746] text-white py-4 rounded-full hover:bg-black duration-300"
              >
                Proceed to Checkout
              </Link>

            </motion.div>

          </div>



        </div>
        <div className=" ml-20">
          <RecommendationPage />
        </div>

      </div>
    </section>
  );
}