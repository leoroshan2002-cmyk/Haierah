import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "../Context/WhislistContext";
import { useRequireAuthAction } from "../hooks/useRequireAuthAction";
import { normalizeImageList } from "../utils/productImages";

const ProductCard = ({
    product,
    onAddToCart,
    onWishlist,
    // isWishlisted = false,
    showColors = true,
    showSizes = true,
    showRating = true,
    showButtons = true,
}) => {
    const colors = product.colors || [];
    const sizes = product.sizes || ["S", "M", "L", "XL"];
    const { isWishlisted } = useWishlist();
    const { requireAuthAction } = useRequireAuthAction();
    const [selectedColor, setSelectedColor] = useState(colors[0] || "");
    const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
    const sanitizedImages = normalizeImageList(product.images || [product.image]);
    const primaryImage = sanitizedImages[0] || product.image || "";
    const secondaryImage = sanitizedImages[1] || "";

    return (
        <motion.div
            /*whileHover={{ y: -6 }}*/
            transition={{ duration: 0.3 }}
            className="group relative"
        >
            {/* Product Image */}
            <Link to={`/product/${product.id}`} className="block overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f7f7f7]">

    {/* First Image */}
    <img
        src={primaryImage}
        alt={product.name}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            secondaryImage ? "group-hover:opacity-0" : ""
        }`}
    />

    {/* Hover Image */}
    {secondaryImage && (
        <img
            src={secondaryImage}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
    )}
</div>
            </Link>

            {/* Wishlist */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!requireAuthAction("toggleWishlist", product)) return;
                    onWishlist?.(product);
                }}
                className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
            >
                <Heart
                    className={`h-5 w-5 transition ${isWishlisted(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700 hover:text-red-500"
                        }`}
                />
            </button>

            {/* Content */}
            {/* <div className="p-4"> */}

                {/* Name & Rating */}
                {/* <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-[15px] line-clamp-2">
                        {product.name}
                    </h3>

                    {showRating && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star
                                size={13}
                                className="fill-yellow-400 text-yellow-400"
                            />
                            {product.rating || "4.8"} ({product.reviews || 248})
                        </div>
                    )}
                </div> */}

                {/* Price */}
                {/* <div className="flex items-center justify-between mt-3">
                    <div>
                        <span className="text-lg font-bold">
                            ₹{product.discountPrice || product.price}
                        </span>

                        {product.discountPrice && (
                            <span className="ml-2 text-sm line-through text-gray-400">
                                ₹{product.price}
                            </span>
                        )}
                    </div>

                    {product.discount && (
                        <span className="rounded bg-red-100 px-2 py-1 text-[10px] font-semibold text-red-500">
                            SAVE {product.discount || "10"}%
                        </span>
                    )}
                </div> */}

                {/* Colors */}
                {/* {showColors && colors.length > 0 && (
                    <div className="mt-4 flex items-center justify-between">

                        
                            <div className="flex gap-2">
                                {colors.map((c) => {
                                    const key = typeof c === "string" ? c : c.name || c.value || JSON.stringify(c);
                                    const value = typeof c === "string" ? c : c.value;

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setSelectedColor(c)}
                                            className={`h-5 w-5 rounded-full border-2 transition ${selectedColor === c
                                                ? "border-black scale-110"
                                                : "border-gray-300"
                                                }`}
                                            style={{ background: value }}
                                        />
                                    );
                                })}
                            </div>

                            <span className="text-xs text-gray-400">
                                {colors.length} Colors
                            </span>
                        </div>
                )} */}

                        {/* Sizes */}
                        {/* {showSizes && sizes.length > 0 && (
                            <div className="mt-4 flex gap-2 flex-wrap">
                                {sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-medium transition ${selectedSize === s
                                            ? "bg-black text-white border-black"
                                            : "border-gray-300 hover:border-black"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )} */}

                        {/* Buttons */}
                        {/* {showButtons && (
                            <div className="mt-5 flex gap-3">
                                <Link
                                    to={`/product/${product.id}`}
                                    className="flex-1 rounded-full bg-[#0d2746] py-2 text-center text-sm font-medium text-white hover:bg-[#16385f] transition"
                                >
                                    View
                                </Link>

                                <button
                                    onClick={() => {
                                        if (!requireAuthAction("addToCart", product)) return;
                                        onAddToCart?.(product);
                                    }}
                                    className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-medium hover:bg-gray-100 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        )} */}
                    {/* </div> */}
        </motion.div>
    );
};

export default ProductCard;