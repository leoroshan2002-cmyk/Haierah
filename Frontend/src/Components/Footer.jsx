import { Bird, Camera, FactoryIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logotransparent from "../assets/HaierahLogoTransparent.png";
import birdLogo from "../assets/BirdLogo.png";

export default function Footer() {

  return (
    <footer className="bg-[#f8f7f5] border-t">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <img src={birdLogo} alt="HAIERAH Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-black">HAIERAH</span>
          </Link>
       

          <p className="text-slate-500 text-sm">
            Crafting timeless elegance for the modern lifestyle
            since 2024.
          </p>

          <div className="flex gap-3 mt-5">
            <FactoryIcon size={18} />
            <Camera size={18} />
            <Bird size={18} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            SHOP
          </h3>

          <ul className="space-y-3 flex flex-col w-fit text-slate-500 text-sm cursor-pointer">
            <Link to="/new-arrivals"> <li className="hover:text-red-600">New Arrivals</li></Link>
            <Link to="/best-sellers"> <li className="hover:text-red-600">Best Sellers</li></Link>
            <Link to="/category/men">  <li className="hover:text-red-600">Men's Collection</li></Link>
            <Link to="/category/women"> <li className="hover:text-red-600">Women's Collection</li></Link>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            CUSTOMER CARE
          </h3>

          <ul className="space-y-3 flex flex-col w-fit text-slate-500 text-sm cursor-pointer">
            <Link to="/shipping-returns"><li className="hover:text-red-700">Shipping & Returns</li></Link>
            <Link to="/privacy-policy"><li className="hover:text-red-700">Privacy Policy</li></Link>
            <Link to="/terms-of-service"><li className="hover:text-red-700">Terms of Service</li></Link>
            <Link to="/contact"><li className="hover:text-red-700">Contact Us</li></Link>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            OUR BRAND
          </h3>

          <ul className="space-y-3 flex flex-col w-fit text-slate-500 text-sm cursor-pointer">
            <Link to="/brand-story"><li className="hover:text-red-700">Brand Story</li></Link>
            <Link to="/sustainability"><li className="hover:text-red-700">Sustainability</li></Link>
            <Link to="/press"><li className="hover:text-red-700">Press</li></Link>
            <Link to="/store-locator"><li className="hover:text-red-700">Store Locator</li></Link>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-sm text-slate-500">
        © 2026 HAIERAH Collection. All rights reserved.
      </div>
    </footer>
  );
}