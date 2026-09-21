import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "../Context/WhislistContext";
import { useRequireAuthAction } from "../hooks/useRequireAuthAction";
import { DEFAULT_IMAGE_FALLBACK, getSafeImageUrl, normalizeImageList } from "../utils/productImages";

const ProductCard = ({
    product,
    onAddToCart,
    onWishlist,
    showButtons = true,
}) => {
    const { isWishlisted } = useWishlist();
    const { requireAuthAction } = useRequireAuthAction();
    const sanitizedImages = normalizeImageList(product.images || [product.image]);
    const primaryImage = getSafeImageUrl(sanitizedImages[0] || product.image, DEFAULT_IMAGE_FALLBACK);
    const secondaryImage = getSafeImageUrl(sanitizedImages[1] || '', '');

    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="group relative h-[386px] overflow-hidden rounded-[1.65rem] bg-white px-5 pb-5 pt-4 shadow-[0_10px_25px_rgba(28,35,40,0.04)] transition-shadow duration-300 group-hover:shadow-[0_18px_35px_rgba(28,35,40,0.12)] sm:h-[410px]"
        >
            <div className="absolute left-5 top-4 z-20">
                {/* Wishlist */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!requireAuthAction("toggleWishlist", product)) return;
                    onWishlist?.(product);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f6f7] transition hover:scale-105"
            >
                <Heart
                    className={`h-5 w-5 transition ${isWishlisted(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700 hover:text-red-500"
                        }`}
                />
            </button>

            </div>

            <span className="absolute right-5 top-4 z-20 flex items-center gap-1 rounded-full border border-orange-100 bg-[#fff8f1] px-3 py-2 text-xs font-medium text-[#343434]">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {product.rating || "4.8"}
            </span>

            <Link to={`/product/${product.id}`} className="block">
                <div className="relative mt-1 h-[245px] overflow-hidden sm:h-[265px]">
                    <img
                        src={primaryImage}
                        alt={product.name}
                        className={`h-full w-full object-contain transition duration-700 group-hover:scale-[1.08] ${secondaryImage ? "group-hover:opacity-0" : ""}`}
                        onError={(e) => {
                            e.currentTarget.src = DEFAULT_IMAGE_FALLBACK;
                        }}
                    />
                    {secondaryImage && (
                        <img
                            src={secondaryImage}
                            alt={`${product.name} - Alternate view`}
                            className="absolute inset-0 h-full w-full object-contain opacity-0 transition duration-700 group-hover:scale-[1.08] group-hover:opacity-100"
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    )}
                </div>
            </Link>

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-medium text-[#3e4246]">{product.name}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-[21px] font-semibold text-[#e64f00]">₹{product.discountPrice || product.price}</span>
                        {product.discountPrice && (
                            <span className="text-sm text-[#777] line-through">₹{product.price}</span>
                        )}
                    </div>
                </div>

                {showButtons && (
                    <button
                        type="button"
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() => {
                            if (!requireAuthAction("addToCart", product)) return;
                            onAddToCart?.(product);
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#20252a] transition duration-300 hover:scale-110 group-hover:bg-[#ed7818] group-hover:text-white"
                    >
                        <ShoppingBag className="h-6 w-6" strokeWidth={1.8} />
                    </button>
                )}
            </div>

            </motion.article>
    );
};

export default ProductCard;