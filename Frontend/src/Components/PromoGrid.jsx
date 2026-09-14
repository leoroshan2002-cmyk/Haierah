import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCampaign } from "../services/api";
import { DEFAULT_IMAGE_FALLBACK, getSafeImageUrl } from "../utils/productImages";

export default function PromoGrid({ category, variant = "top" }) {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadCampaign = async () => {
      const campaign = await getCampaign(category);
      if (!isMounted) return;

      const promoCards = (campaign?.promoCards || []).filter((item) => item?.title || item?.description || item?.image);
      const bottomCards = (campaign?.bottomPromoCards || []).filter((item) => item?.title || item?.description || item?.image);
      const cards = variant === "bottom" ? (bottomCards.length > 0 ? bottomCards : promoCards) : promoCards;

      setPromos(cards);
    };

    loadCampaign();

    return () => {
      isMounted = false;
    };
  }, [category, variant]);

  if (promos.length === 0) return null;

  return (
    <section className={`grid grid-cols-1 ${variant === "bottom" ? "gap-4 md:grid-cols-2" : "gap-4 md:grid-cols-2 md:gap-6"}`}>
      {promos.map((item, index) => (
        <motion.article
          key={item.id || index}
          initial={{ opacity: 0, y: 32, scale: 0.985, filter: "blur(1.5px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ y: -6, scale: 1.005 }}
          transition={{ duration: 1.4, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="group relative h-[420px] overflow-hidden rounded-[1.5rem] shadow-[0_18px_40px_rgba(0,0,0,0.16)] sm:h-[550px]"
        >
          <motion.div
            initial={{ scale: 1.04, opacity: 0.92 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <motion.img
              src={getSafeImageUrl(item.image, DEFAULT_IMAGE_FALLBACK)}
              alt={item.title}
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMAGE_FALLBACK;
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.12 + index * 0.08 }}
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.72))]"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.22 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-8 left-8 max-w-sm text-white sm:bottom-12 sm:left-12"
          >
            {item.title && (
              <motion.h2
                whileHover={{ x: 3 }}
                transition={{ duration: 0.35 }}
                className="font-serif text-3xl leading-[0.9] tracking-[-0.05em] sm:text-4xl lg:text-[3rem]"
              >
                {item.title}
              </motion.h2>
            )}

            {item.description && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.38 + index * 0.16 }}
                className="mt-3 max-w-xs text-sm leading-6 text-white/80 sm:text-[0.95rem]"
              >
                {item.description}
              </motion.p>
            )}
          </motion.div>
        </motion.article>
      ))}
    </section>
  );
}