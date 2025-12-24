// src/components/layout/MobileMenu.jsx
import { motion as Motion } from "framer-motion";
import {
  FiFeather,
  FiHeart,
  FiShoppingCart,
  FiBook,
  FiBell,
  FiTruck,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function MobileMenu({
  setMobileOpen,
  user,
  isAdminUser,
  isDeliveryUser,
  unreadCount,
  isRTL,
  navigate,
  handleLogout,
}) {
  const { t } = useTranslation();

  return (
    <Motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`lg:hidden border-t border-white/10 ${
        user?.theme === "dark" ? "bg-[#050909]/98" : "bg-[#102526]/98"
      } backdrop-blur-sm text-white`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`px-6 py-4 flex flex-col gap-4 ${
          isRTL ? "text-right items-end" : ""
        }`}
      >
        {/* Search */}
        {/* هنا ممكن تضيف SearchBar لو حابب */}

        <button
          onClick={() => {
            setMobileOpen(false);
            navigate("/");
          }}
          className="flex items-center gap-3 py-2"
        >
          <FiFeather className="w-4 h-4" />
          {t("nav.home", "Home")}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/products");
          }}
          className={`py-2 w-full ${
            isRTL ? "text-right" : "text-left"
          } inline-flex items-center gap-2`}
        >
          🛒 {t("nav.products", "Products")}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/favorites");
          }}
          className={`py-2 w-full ${
            isRTL ? "text-right" : "text-left"
          } inline-flex items-center gap-2`}
        >
          <FiHeart className="w-4 h-4" />
          {t("navbar.favorites")}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/cart");
          }}
          className={`py-2 w-full ${
            isRTL ? "text-right" : "text-left"
          } inline-flex items-center gap-2`}
        >
          <FiShoppingCart className="w-4 h-4" />
          {t("navbar.cart")}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/articles");
          }}
          className={`py-2 w-full ${
            isRTL ? "text-right" : "text-left"
          } inline-flex items-center gap-2`}
        >
          <FiBook className="w-4 h-4" />
          {t("nav.articles", "Articles")}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/notifications");
          }}
          className={`py-2 w-full ${
            isRTL ? "text-right" : "text-left"
          } flex items-center justify-between`}
        >
          <span className="inline-flex items-center gap-2">
            <FiBell className="w-4 h-4" />
            {t("navbar.notifications")}
          </span>
          {unreadCount > 0 && (
            <span className="rtl-ml-auto rtl-mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs px-2 py-0.5">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {(isDeliveryUser || isAdminUser) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              navigate("/delivery");
            }}
            className={`py-2 w-full ${
              isRTL ? "text-right" : "text-left"
            } inline-flex items-center gap-2`}
          >
            <FiTruck className="w-4 h-4" />
            {t("delivery.portal", "Delivery Hub")}
          </button>
        )}

        {isAdminUser && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              navigate("/admin");
            }}
            className={`py-2 w-full ${
              isRTL ? "text-right" : "text-left"
            } inline-flex items-center gap-2`}
          >
            <FiSettings className="w-4 h-4" />
            {t("admin.dashboard")}
          </button>
        )}

        {user && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                navigate("/account/settings");
              }}
              className={`py-2 w-full ${
                isRTL ? "text-right" : "text-left"
              } inline-flex items-center gap-2`}
            >
              <FiUser className="w-4 h-4" />
              {t("navbar.account")}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
                setMobileOpen(false);
              }}
              className={`text-red-400 py-2 w-full ${
                isRTL ? "text-right" : "text-left"
              } inline-flex items-center gap-2`}
            >
              🚪 {t("navbar.logout")}
            </button>
          </>
        )}
      </div>
    </Motion.div>
  );
}
