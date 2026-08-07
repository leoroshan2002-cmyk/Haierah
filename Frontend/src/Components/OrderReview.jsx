import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../Context/CartContext";

export default function OrderReview() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <div className="p-8">

      <h2 className="text-3xl font-serif font-semibold mb-8">
        Review Your Order
      </h2>

      <div className="space-y-8">
        {cart.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500">
            Your cart is empty. Add items to review your order.
          </div>
        ) : (
          cart.map((item) => {
            const itemKey = item.cartItemKey || item.id || item._id;
            const sizeLabel = item.selectedSize || item.size || "M";
            const colorLabel = item.selectedColor || item.color || "Black";

            return (
              <motion.div
                whileHover={{ y: -3 }}
                key={itemKey}
                className="flex gap-6 border rounded-3xl p-5"
              >
                <img
                  src={item.image}
                  className="w-28 h-32 rounded-2xl object-cover"
                  alt={item.name}
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-2xl font-serif font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 mt-2">Size : {sizeLabel}</p>
                      <p className="text-gray-500">Color : {colorLabel}</p>
                    </div>

                    <div className="text-2xl font-bold">
                      ₹{((item.price || 0) * (item.qty || 0)).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex border rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(itemKey, (item.qty || 1) - 1)}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-5 py-2">{item.qty || 1}</span>

                      <button
                        onClick={() => updateQuantity(itemKey, (item.qty || 1) + 1)}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(itemKey)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}