import { Link, useLocation } from "react-router-dom";
import { Feature, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import ProductCard from "../Components/ProductCard";
import { useWishlist } from "../Context/WhislistContext";
import { useRequireAuthAction } from "../hooks/useRequireAuthAction";
import PageBack from "../Components/CommonDetails/PageBack";
import { fetchProducts } from "../services/api";
import { filterProductsBySearch } from "../utils/searchUtils";
import HaierahStandard from "../Components/HaierahStandard";
import Footer from "../Components/Footer";


export default function ProductsPage() {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get("category") || "";
    const searchFilter = queryParams.get("search") || "";

    useEffect(() => {
        const loadProducts = async () => {
            const response = await fetchProducts();
            setProducts(response);
        };

        loadProducts();

        const handleInventoryChange = () => {
            loadProducts();
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('haierah-products-updated', handleInventoryChange);
            window.addEventListener('haierah-order-created', handleInventoryChange);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('haierah-products-updated', handleInventoryChange);
                window.removeEventListener('haierah-order-created', handleInventoryChange);
            }
        };
    }, []);

    const { addToCart } = useCart();
    const { requireAuthAction } = useRequireAuthAction();

    const activeSearch = search || searchFilter;
    const filteredProducts = filterProductsBySearch(products, activeSearch).filter((product) => {
        const matchesCategory =
            !categoryFilter ||
            product.category?.toLowerCase().includes(categoryFilter.toLowerCase());

        return matchesCategory;
    });

    const handleCart = (product) => {
        if (!requireAuthAction("addToCart", product)) return;
        addToCart(product);
    };
    const { toggleWishlist } = useWishlist();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-full max-w-7xl w-full mx-auto px-6 py-20 bg-[#f8f7f5]"
        >

            {/* TOP BANNER ADDED (ONLY NEW SECTION) */}
            {/* <div className="relative mb-10 overflow-hidden  bg-white border-b border-black  shadow-xl">
                <div className="grid md:grid-cols-2 min-h-[420px]">

                    {/* Left Content */}
                    {/* <div className="absolute bottom-0 left-0 flex flex-col col-span-2 justify-center p-8 md:p-14">
                        <h2 className="font-black uppercase leading-[0.9] tracking-[-0.05em] text-red-600">
                            <span className="block text-5xl md:text-7xl">
                                UP TO 50% OFF
                            </span>

                            <span className="block mt-4 text-5xl md:text-7xl">
                                NEW STYLES ADDED
                            </span>
                        </h2>

                        
                    </div> 

                   
                </div>
            </div> */}
            {/* 🔥 END BANNER */}
            
            <div className="mb-6">
                 <PageBack />
            </div>
            
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Shop All</h1>
                {/* <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-full px-4 py-2 w-72 outline-none focus:ring-2 focus:ring-[#0d2746]"
                /> */}
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (

                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleCart}
                            onWishlist={toggleWishlist}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-16">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            No products found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Try searching with a different keyword.
                        </p>
                    </div>
                )}
            </div>

            <HaierahStandard />
            <Footer />
        </motion.div >
    );
}