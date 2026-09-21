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

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

export default function CategoryPage() {
  const { slug } = useParams();
  const location = useLocation();
  const subcategory = new URLSearchParams(location.search).get("subcategory");
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { addToCart } = useCart();
  const { requireAuthAction } = useRequireAuthAction();
  const { toggleWishlist } = useWishlist();

  useEffect(() => {
    let cancelled = false;
    const loadCategory = async () => {
      setLoadingCategory(true);
      const categories = await fetchCategories();
      if (cancelled) return;
      setCategory(categories.find((item) => item.slug === slug || item.slug === encodeURIComponent(slug)) || null);
      setLoadingCategory(false);
    };
    loadCategory();
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    const loadProducts = async () => {
      setLoadingProducts(true);
      const response = await fetchProducts();
      if (cancelled) return;
      setProducts(response);
      setLoadingProducts(false);
    };
    loadProducts();
    const handleInventoryChange = () => loadProducts();
    window.addEventListener("haierah-products-updated", handleInventoryChange);
    window.addEventListener("haierah-order-created", handleInventoryChange);
    const unsubscribeCatalog = subscribeToCatalogChanges(handleInventoryChange);
    return () => {
      cancelled = true;
      unsubscribeCatalog();
      window.removeEventListener("haierah-products-updated", handleInventoryChange);
      window.removeEventListener("haierah-order-created", handleInventoryChange);
    };
  }, []);

  const normalizeValue = (value) => normalizeSearchText(value);
  const getProductSubcategories = (product) => {
    if (Array.isArray(product.subCategories)) return product.subCategories.filter(Boolean);
    if (Array.isArray(product.subCategory)) return product.subCategory.filter(Boolean);
    return [product.subCategory].filter(Boolean);
  };
  const availableSubcategories = category ? (Array.isArray(category.subCategories) ? category.subCategories : [category.subCategory].filter(Boolean)) : [];
  const filteredProducts = category ? products.filter((product) => {
    const productCategory = normalizeValue(product.category);
    const matchesCategory = productCategory === normalizeValue(category.name) || productCategory === normalizeValue(category.slug);
    const matchesSubcategory = !subcategory || getProductSubcategories(product).some((value) => normalizeValue(value) === normalizeValue(subcategory));
    return matchesCategory && matchesSubcategory;
  }) : [];

  if (loadingCategory || loadingProducts) {
    return <div className="min-h-screen bg-[#f8f7f5] px-8 pb-24 pt-24"><div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-6 md:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-200" />)}</div></div>;
  }

  if (!category) {
    return <div className="min-h-screen bg-[#f8f7f5] px-6 pb-24 pt-28 text-center"><h1 className="mb-4 text-4xl font-bold">Category not found</h1><Link to="/products" className="rounded-full bg-amber-700 px-6 py-3 font-bold text-white">Browse all products</Link></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#172333]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}><CampaignSlider category={category.slug} /></motion.div>
      <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="mx-auto mt-8 max-w-[1440px] px-4 sm:mt-12 sm:px-8 lg:px-12"><PromoGrid category={category.slug} variant="top" /></motion.div>
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-8"><PageBack /></div>
        <motion.header initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ duration: 0.7 }} className="mb-12 flex flex-col gap-8 border-y border-[#172333]/15 py-8 md:flex-row md:items-end md:justify-between">
          <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b36c42]">The Haierah edit / 2026</p><h1 className="font-serif text-5xl tracking-[-0.04em] sm:text-6xl">{category.name}</h1><p className="mt-4 max-w-xl text-sm leading-7 text-[#172333]/65">Considered pieces for everyday movement, cut with intention and made to stay in rotation.</p></div>
          <div className="flex flex-col items-start gap-4 md:items-end"><span className="text-xs uppercase tracking-[0.2em] text-[#172333]/55">{filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}</span>{availableSubcategories.length > 0 && <nav className="flex flex-wrap gap-2" aria-label={`${category.name} subcategories`}><Link to={`/category/${category.slug}`} className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${!subcategory ? "border-[#172333] bg-[#172333] text-white" : "border-[#172333]/20 text-[#172333]/65"}`}>All</Link>{availableSubcategories.map((item) => <Link key={item} to={`/category/${category.slug}?subcategory=${encodeURIComponent(item)}`} className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${normalizeValue(subcategory) === normalizeValue(item) ? "border-[#b36c42] bg-[#b36c42] text-white" : "border-[#172333]/20 text-[#172333]/65"}`}>{item}</Link>)}</nav>}</div>
        </motion.header>
        {filteredProducts.length > 0 ? <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={{ visible: { transition: { staggerChildren: 0.07 } } }} className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">{filteredProducts.map((product) => <motion.div key={product.id} variants={reveal} transition={{ duration: 0.6 }}><ProductCard product={product} onAddToCart={() => { if (!requireAuthAction("addToCart", product)) return; addToCart(product); }} onWishlist={toggleWishlist} /></motion.div>)}</motion.div> : <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center"><h3 className="mb-3 text-2xl font-semibold">No products yet</h3><p className="mb-6 text-slate-500">There are no products assigned to the {category.name} category yet.</p><Link to="/products" className="rounded-full bg-amber-700 px-6 py-3 font-bold text-white">Browse other categories</Link></div>}
      </div>
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto mt-8 max-w-[1440px] px-4 sm:mt-12 sm:px-8 lg:px-12">
        {/* <PromoGrid category={category.slug} variant="bottom" /> */}
        </motion.div>
      <HaierahStandard /><Footer />
    </motion.div>
  );
}
