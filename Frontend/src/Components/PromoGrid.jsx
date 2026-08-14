import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <section className={`grid grid-cols-1 ${variant === "bottom" ? "md:grid-cols-2 gap-4" : "md:grid-cols-2 gap-6"}`}>
      {promos.map((item, index) => (
        <div key={item.id || index} className="relative h-[550px] overflow-hidden group rounded-[2rem]">
          <img
            src={getSafeImageUrl(item.image, DEFAULT_IMAGE_FALLBACK)}
            alt={item.title}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_IMAGE_FALLBACK;
            }}
          />

          <div className="absolute inset-0 bg-black/25"></div>

          {/* <div className="absolute bottom-12 left-12 text-white max-w-sm">
            {item.title && <h2 className="text-4xl font-bold mb-4">{item.title}</h2>}
            {item.description && <p className="text-lg mb-6 leading-relaxed">{item.description}</p>}

            {item.link && (
              <Link
                to={item.link}
                className="inline-flex items-center gap-2 rounded-full border border-white px-5 py-3 text-sm font-semibold uppercase tracking-[.18em] text-white transition hover:bg-white/10"
              >
                {item.button || item.buttonText || "SHOP NOW"}
                <span>→</span>
              </Link>
            )}
          </div> */}
        </div>
      ))}
    </section>
  );
}