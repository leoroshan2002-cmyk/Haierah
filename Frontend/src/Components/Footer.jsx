import { ArrowRight, AtSign, Camera, FactoryIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import logotransparent from "../assets/HaierahLogoTransparent.png";

export default function Footer() {
  return (
    <footer className="mx-2 overflow-hidden rounded-t-[22px] bg-white text-[#071329]">
      <div className="mx-auto px-6 py-2 sm:px-8 lg:px-6 lg:pb-[80px] lg:pt-[60px]">
        <div className="grid gap-2 p-15 lg:grid-cols-2 lg:gap-[10px]">
          <div>
            <Link to="/home">
              <img
                src={logotransparent}
                alt="HAIERAH Logo"
                className="h-11 w-auto object-contain transition-all duration-300 sm:h-14"
              />
            </Link>
            <p className="mt-7 max-w-[510px] text-[17px] leading-7 text-[#344054]">
              Premium menswear for the modern gentleman. Elevate<br className="hidden sm:block" />
              your wardrobe with timeless pieces crafted for distinction.
            </p>
            <div className="mt-10 flex items-center gap-2.5">
              <span className="mr-3 text-[17px]">Follow us on</span>
              {[
                [Camera, "Instagram"],
                [X, "X"],
                [AtSign, "Facebook"],
                [FactoryIcon, "LinkedIn"],
              ].map(([Icon, label]) => (
                <a
                  key={label}
                  href="#social"
                  aria-label={label}
                  className="grid size-[50px] place-items-center rounded-[10px] bg-[#f4f6f7] transition hover:bg-[#e9edef]"
                >
                  <Icon size={19} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[31px] font-medium">Newsletter</h2>
            <p className="mt-5 max-w-[500px] text-[17px] leading-7 text-[#344054]">
              Get exclusive drops, styling notes, and early access to new<br className="hidden sm:block" />
              collections, straight to your inbox.
            </p>
            <form className="mt-9 flex h-[60px] items-center rounded-full border border-[#e9edef] bg-[#f4f6f7] p-1.5">
              <input
                type="email"
                aria-label="Your email address"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-5 text-[16px] text-[#071329] outline-none placeholder:text-[#344054]"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f47c20] text-white transition hover:bg-[#df6810]"
              >
                <ArrowRight size={22} strokeWidth={1.7} />
              </button>
            </form>
          </div>
        </div>

        <div className="my-10 border-t border-[#dfe3e6]" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          <FooterColumn title="Company" links={[["About Us", "/brand-story"], ["Our Story", "/brand-story"], ["Careers", "/contact"]]} />
          <FooterColumn title="Customer Support" links={[["FAQ", "/contact"], ["Track Order", "/orders"], ["Shipping & Returns", "/shipping-returns"]]} />
          <FooterColumn title="Shop" links={[["NEW ARRAIVAL", "/category/new-arraival"], ["KIDS", "/category/kids"], ["WOMEN", "/category/women"], ["MEN", "/category/men"], ["UNISEX", "/category/unisex"]]} />
          <FooterColumn title="Quick Links" links={[["Categories", "/categories"], ["Wishlist", "/wishlist"], ["Cart", "/cart"], ["My Account", "/account"]]} />
          <div>
            <h3 className="text-[17px] font-medium">Contact</h3>
            <address className="mt-7 space-y-4 text-[16px] not-italic leading-6 text-[#526071]">
              <a href="mailto:contact@yourdomain.com" className="block hover:text-[#071329]">contact@yourdomain.com</a>
              <a href="tel:+15550000000" className="block hover:text-[#071329]">+1 (555) 000-0000</a>
              <p>123 Business Street, City, Country</p>
              <p>Mon–Fri, 9am–6pm</p>
            </address>
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-[17px] font-medium">{title}</h3>
      <ul className="mt-7 space-y-4 text-[16px] leading-6 text-[#526071]">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="hover:text-[#071329]">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}