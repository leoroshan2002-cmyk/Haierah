import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCampaign } from "../services/api";
import { DEFAULT_IMAGE_FALLBACK, getSafeImageUrl } from "../utils/productImages";

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
    <div className="relative h-[550px] w-full overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id || index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === current ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`absolute inset-0 ${index === current ? "z-10" : "z-0 pointer-events-none"}`}
        >
          <motion.img
            src={getSafeImageUrl(slide.image, DEFAULT_IMAGE_FALLBACK)}
            alt={slide.title}
            initial={{ scale: 1.08 }}
            animate={{ scale: index === current ? 1.02 : 1.08 }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_IMAGE_FALLBACK;
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: index === current ? 1 : 0, x: index === current ? 0 : -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute bottom-16 left-6 max-w-xl text-white sm:left-12 lg:left-20"
          >
            {slide.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 10 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/75"
              >
                {slide.subtitle}
              </motion.p>
            )}

            {slide.title && (
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 14 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="max-w-lg font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-6xl"
              >
                {slide.title}
              </motion.h1>
            )}

            {slide.description && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 12 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 max-w-sm text-sm leading-6 text-white/80"
              >
                {slide.description}
              </motion.p>
            )}

            {slide.link && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 12 }}
                transition={{ duration: 0.6, delay: 0.24 }}
              >
            
              </motion.div>
            )}
          </motion.div>

       
        </motion.div>
      ))}

      <button
        onClick={prevSlide}
        aria-label="Previous campaign slide"
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/70"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next campaign slide"
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white transition hover:bg-black/70"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}