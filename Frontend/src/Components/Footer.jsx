import { Bird, Camera, FactoryIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer className="bg-[#f8f7f5] border-t">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-4">
            HAIERAH
          </h2>

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

          <ul className="space-y-2 flex flex-col w-fit text-slate-500 text-sm cursor-pointer">
            <Link to="/new-arrivals"> <li className="hover:text-red-600">New Arrivals</li></Link>
            <Link> <li className="hover:text-red-600">Best Sellers</li></Link>
            <Link to="/men">  <li className="hover:text-red-600">Men's Collection</li></Link>
            <Link to="/women"> <li className="hover:text-red-600">Women's Collection</li></Link>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            CUSTOMER CARE
          </h3>

          <ul className="space-y-2 text-slate-500 text-sm w-fit cursor-pointer">
            <li className="hover:text-red-700">Shipping & Returns</li>
            <li className="hover:text-red-700">Privacy Policy</li>
            <li className="hover:text-red-700">Terms of Service</li>
            <li className="hover:text-red-700">Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            OUR BRAND
          </h3>

          <ul className="space-y-2 text-slate-500 text-sm w-fit cursor-pointer">
            <li className="hover:text-red-700">Brand Story</li>
            <li className="hover:text-red-700">Sustainability</li>
            <li className="hover:text-red-700">Press</li>
            <li className="hover:text-red-700">Store Locator</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-sm text-slate-500">
        © 2026 HAIERAH Collection. All rights reserved.
      </div>
    </footer>
  );
}