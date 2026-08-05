import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "Ocean Blue Polo",
    price: "₹89.00",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Summer Linen Blouse",
    price: "₹125.00",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Minimal Leather Court",
    price: "₹210.00",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Nomad Silver Watch",
    price: "₹345.00",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function NewArrivals() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <span className="uppercase tracking-[4px] text-xs text-gray-500">
            New Season
          </span>

          <h2 className="text-5xl font-light mt-3">Just Dropped</h2>

          <p className="text-gray-500 mt-4 max-w-lg">
            Discover effortless styles crafted for modern living.
            Every piece is designed to blend comfort,
            elegance and timeless fashion.
          </p>
        </div>

        <button className="group flex items-center gap-2 text-sm font-medium hover:text-black transition">
          View All
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Editorial Banner */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-[32px] h-[620px] group">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
              alt="HAIRA Collection"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-10 left-8 right-8">
              <p className="uppercase tracking-[5px] text-white/70 text-sm">
                HAIRA EDIT
              </p>

              <h3 className="text-4xl text-white font-light mt-4 leading-tight">
                Crafted for
                <br />
                Everyday Luxury
              </h3>

              <p className="text-white/80 mt-4">
                Fresh arrivals inspired by effortless elegance.
              </p>

              <button className="mt-8 bg-white text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition duration-300">
                Explore Collection
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4 w-max">
            {products.map((product) => (
              <div
                key={product.name}
                className="w-[280px] flex-shrink-0 group cursor-pointer"
              >
                <div className="overflow-hidden rounded-3xl bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[380px] object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-medium group-hover:text-gray-800 transition">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}