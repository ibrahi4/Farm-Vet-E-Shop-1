import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavourite } from "../../features/favorites/favoritesSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { motion as Motion } from "framer-motion";
import { Heart, ShoppingCart, Sparkles, Zap } from "lucide-react";
import Button from "../ui/Button";
import { UseTheme } from "../../theme/ThemeProvider";
import { useTranslation } from "react-i18next";
import {
  getLocalizedProductTitle,
  ensureProductLocalization,
} from "../../utils/productLocalization";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductCard({ product, index = 0 }) {
  // جميع الـ Hooks هنا في البداية
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = UseTheme();
  const isDark = theme === "dark";
  const { t, i18n } = useTranslation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const favorites = useSelector((s) => s.favorites.items ?? []);
  const inCart = useSelector((s) =>
    s.cart.items.some((c) => c.id === product?.id)
  );

  // 🟢 Skeleton
  if (!product) {
    return <ProductCardSkeleton />;
  }

  // باقي الكود عادي
  const isFav = favorites.some((f) => String(f.id) === String(product?.id));
  const imageUrl = product?.thumbnailUrl || product?.img || "/placeholder.png";
  const stock = Number(product?.stock ?? product?.quantity ?? 0);
  const isAvailable = product?.isAvailable !== false && stock > 0;
  const displayTitle = getLocalizedProductTitle(product, i18n.language || "ar");

  const badge =
    product?.badge ||
    (product?.isNew && "New") ||
    (product?.isTrending && "Hot") ||
    (product?.onSale && "Sale");

  const unavailableLabel = t("products.details.outOfStock", "نفذت الكمية");

  return (
    <Motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => navigate(`/product/${product?.id}`)}
      className={`
        relative group p-4 rounded-2xl cursor-pointer overflow-hidden
        max-w-[320px] w-full
        ${
          isDark
            ? "bg-[#0f1a1a]/70 border border-emerald-900/50"
            : "bg-white border border-slate-200"
        }
      `}
    >
      {/* FAVORITE */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleFavourite(ensureProductLocalization(product)));
        }}
        className={`
          absolute top-3 right-3 z-30 p-2 rounded-full transition-all
          ${
            isFav
              ? "bg-red-500 shadow-lg shadow-red-500/40"
              : isDark
              ? "bg-black/40"
              : "bg-white"
          }
        `}
      >
        <Heart
          size={18}
          className={isFav ? "text-white fill-white" : "text-slate-600"}
        />
      </button>

      {/* BADGE */}
      {badge && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
          <Sparkles size={14} />
          {badge}
        </div>
      )}

      {/* IMAGE */}
      <div
        className="w-full aspect-square rounded-xl bg-cover bg-center shadow-inner"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {/* TITLE */}
      <h3
        className={`mt-3 text-center font-bold line-clamp-2 ${
          isDark ? "text-emerald-100" : "text-slate-800"
        }`}
      >
        {displayTitle}
      </h3>

      {/* PRICE */}
      <p className="text-center text-xl font-extrabold text-emerald-600 mt-1">
        {(Number(product?.price) || 0).toLocaleString()} EGP
      </p>

      {/* ACTIONS */}
      <div className="mt-4 flex gap-2">
        {/* ADD TO CART */}
        <Motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            if (inCart || !isAvailable) return;
            dispatch(addToCart(ensureProductLocalization(product)));
          }}
          disabled={inCart || !isAvailable}
          className={`
            flex-1 flex items-center justify-center gap-2 rounded-xl py-2 font-semibold
            ${
              inCart || !isAvailable
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-emerald-600 text-white shadow-lg shadow-emerald-500/40"
            }
          `}
        >
          <ShoppingCart size={18} />
        </Motion.button>

        {/* BUY NOW */}
        <Button
          text={t("favorites.products.buyNow", "اشتري الآن")}
          onClick={(e) => {
            e.stopPropagation();
            if (!isAvailable) return;
            navigate("/checkout");
          }}
          className="flex-1 rounded-xl font-bold"
          icon={<Zap size={16} />}
          disabled={!isAvailable}
        />
      </div>

      {!isAvailable && (
        <p className="mt-2 text-center text-xs text-amber-500">
          {unavailableLabel}
        </p>
      )}
    </Motion.div>
  );
}
