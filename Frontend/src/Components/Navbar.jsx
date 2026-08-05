import { NavLink, useLocation } from "react-router-dom";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useWishlist } from "../Context/WhislistContext";
import { useCart } from "../Context/CartContext";
import logotransparent from "../assets/HaierahLogoTransparent.png";
import CategoriesSidebar from "./CategoriesSidebar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { fetchCategories } from "../services/api";

const staticNavItems = [
  // { name: "ALL CATEGORIES", path: "/products", type: "page" },
];

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cart, getCartCount } = useCart();
  const cartCount = getCartCount();

  const location = useLocation();
  const isHomePage = ["/", "/home"].includes(location.pathname);

  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("MEN");
  const [search, setSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  const categoryNavItems = categories
    .filter(
      (cat) =>
        !staticNavItems.some((item) => item.name === cat.name?.toUpperCase()) &&
        cat.slug
    )
    .map((cat) => ({
      name: cat.name?.toUpperCase(),
      path: `/category/${cat.slug}`,
      type: "category-page",
    }));

  const navItems = [...staticNavItems, ...categoryNavItems].filter(
    (item, index, array) =>
      index ===
      array.findIndex(
        (other) =>
          other.name === item.name && other.path === item.path
      )
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetchCategories();
      setCategories(response);
    };

    loadCategories();
  }, []);

  const handleMenu = (item) => {
    setActiveMenu(item.name);

    if (item.type === "page" || item.type === "category-page") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHomePage
          ? isScrolled
            ? "bg-white/95 shadow-md backdrop-blur-md"
            : "bg-black/25 shadow-sm backdrop-blur-md"
          : "bg-white/95 shadow-md backdrop-blur-md"
      }`}
    >
      <div className="relative max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/home">
          <img
            src={logotransparent}
            alt="HAIERAH Logo"
            className="h-14 w-auto object-contain transition-all duration-300"
          />
        </NavLink>
        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-10 text-sm font-medium">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ y: -2 }}
              onMouseEnter={() => handleMenu(item)}
              className="serif"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative py-1 transition-all duration-300 ${
                    isHomePage
                      ? isScrolled
                        ? isActive
                          ? "text-amber-700"
                          : "text-gray-900 hover:text-amber-700"
                        : isActive
                        ? "text-white"
                        : "text-white hover:text-gray-300"
                      : isActive
                      ? "text-amber-700"
                      : "text-gray-900 hover:text-amber-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-amber-700 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* ICONS */}
        <div
          className={`flex gap-4 items-center transition-colors duration-300 ${
            isHomePage
              ? isScrolled
                ? "text-gray-800"
                : "text-white"
              : "text-gray-800"
          }`}
        >
          <div
            onClick={() => setSearch(true)}
            className="cursor-pointer hover:text-amber-700 transition"
          >
            <Search />
          </div>

          <NavLink
            to="/wishlist"
            className="hover:text-amber-700 transition relative"
          >
            <Heart />

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className="hover:text-amber-700 transition relative"
          >
            <ShoppingBag />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/account"
            className="hover:text-amber-700 transition"
          >
            <User />
          </NavLink>
        </div>
      </div>

      {/* CATEGORY SIDEBAR */}
      <CategoriesSidebar
        open={open}
        setOpen={setOpen}
        activeMenu={activeMenu}
      />

      {/* SEARCH */}
      {search && (
        <SearchBar
          open={search}
          setOpen={setSearch}
        />
      )}
    </header>
  );
}