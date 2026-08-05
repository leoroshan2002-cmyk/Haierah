import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCampaign } from "../services/api";

export default function CampaignSlider({ category }) {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadCampaign = async () => {
      const campaign = await getCampaign(category);
      if (!isMounted) return;
      setSlides((campaign?.slider || []).filter((slide) => slide?.title || slide?.subtitle || slide?.image));
      setCurrent(0);
    };

    loadCampaign();

    return () => {
      isMounted = false;
    };
  }, [category]);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[550px] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id || index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black/25"></div>

          <div className="absolute left-20 top-1/2 -translate-y-1/2 text-white max-w-xl">
            {/* <p className="uppercase tracking-[4px] text-sm mb-4">{slide.subtitle}</p>
            <h1 className="text-6xl font-bold leading-tight mb-6">{slide.title}</h1>
            <p className="text-xl mb-8">{slide.description}</p> */}

            {/* <Link
              to={slide.link || "/products"}
              className="bg-white text-black px-8 py-4 font-semibold hover:bg-gray-200 transition"
            >
              {slide.button || slide.buttonText || "SHOP NOW"}
            </Link> */}
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full hover:bg-black"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}