import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useParams, Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WhislistContext";
import { useRequireAuthAction } from "../hooks/useRequireAuthAction";
import ProductCard from "../Components/ProductCard";
import PageBack from "../Components/CommonDetails/PageBack";
import { fetchProducts, fetchCategories } from "../services/api";
import { normalizeSearchText } from "../utils/searchUtils";
import { subscribeToCatalogChanges } from "../utils/catalogSync";
import HaierahStandard from "../Components/HaierahStandard";
import Footer from "../Components/Footer";
import CampaignSlider from "../Components/CampaignSlider";
import PromoGrid from "../Components/PromoGrid";
export default function CategoryPage() {
  const { slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subcategory = searchParams.get("subcategory");
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { requireAuthAction } = useRequireAuthAction();
  const { toggleWishlist } = useWishlist();

  useEffect(() => {
    const loadCategory = async () => {
      const categories = await fetchCategories();
      const matchedCategory = categories.find(
        (cat) => cat.slug === slug || cat.slug === encodeURIComponent(slug)
      );
      setCategory(matchedCategory || null);
    };

    loadCategory();
  }, [slug]);

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

    const unsubscribeCatalog = subscribeToCatalogChanges(handleInventoryChange);

    return () => {
      unsubscribeCatalog();
      if (typeof window !== 'undefined') {
        window.removeEventListener('haierah-products-updated', handleInventoryChange);
        window.removeEventListener('haierah-order-created', handleInventoryChange);
      }
    };
  }, []);

  const normalizeValue = (value) => normalizeSearchText(value);

  const getCategorySubcategories = () => {
    if (!category) return [];

    const fromCategory = Array.isArray(category.subCategories)
      ? category.subCategories
      : category.subCategory
        ? [category.subCategory]
        : [];

    if (fromCategory.length > 0) {
      return fromCategory.filter(Boolean);
    }

    const categoryProducts = products.filter((product) => {
      const productCategory = normalizeValue(product.category);
      const categoryName = normalizeValue(category.name);
      const categorySlug = normalizeValue(category.slug);
      return productCategory === categoryName || productCategory === categorySlug;
    });

    const discovered = categoryProducts
      .map((product) => getProductSubcategories(product))
      .flat()
      .filter(Boolean);

    return Array.from(new Set(discovered));
  };

  const getProductSubcategories = (product) => {
    if (Array.isArray(product.subCategories)) {
      return product.subCategories.filter(Boolean);
    }

    if (Array.isArray(product.subCategory)) {
      return product.subCategory.filter(Boolean);
    }

    return [product.subCategory].filter(Boolean);
  };

  const availableSubcategories = getCategorySubcategories();

  const filteredProducts = category
    ? products.filter((product) => {
        const productCategory = normalizeValue(product.category);
        const categoryName = normalizeValue(category.name);
        const categorySlug = normalizeValue(category.slug);
        const matchesCategory = productCategory === categoryName || productCategory === categorySlug;

        const matchesSubcategory =
          !subcategory ||
          getProductSubcategories(product).some((value) => normalizeValue(value) === normalizeValue(subcategory));

        return matchesCategory && matchesSubcategory;
      })
    : [];

  if (!category) {
    return (
      <div className="min-h-screen pt-28 bg-[#f8f7f5]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Category not found</h1>
          <p className="text-slate-600 mb-6">
            We couldn&apos;t find the category you were looking for.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-white font-bold hover:bg-amber-800 transition"
          >
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-[#f8f7f5] via-white to-white"
    >
      
      {/* Campaign Banner */}
     <CampaignSlider category={category?.slug} />

     {/* top promo images */}
     <div className="mt-12">
       <PromoGrid category={category?.slug} variant="top" />
     </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-24">
        
        <div className="mb-6">
          <PageBack />
        </div>

        


        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => {
                  if (!requireAuthAction("addToCart", product)) return;
                  addToCart(product);
                }}
                onWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">No products yet</h3>
            <p className="text-slate-500 mb-6">
              There are no products assigned to the {category.name} category yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-white font-bold hover:bg-amber-800 transition"
            >
              Browse other categories
            </Link>
          </div>
        )}
      </div>
      
        {/* bottom promo images */}
        <div className="mt-12">
          <PromoGrid category={category?.slug} variant="bottom" />
        </div>
       
      <HaierahStandard />
      
      <Footer />
    </motion.div>
  );
}
