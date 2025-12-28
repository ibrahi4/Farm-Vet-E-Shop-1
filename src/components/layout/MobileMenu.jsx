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
  unreadCount = 0,
  favoritesCount = 0,
  cartCount = 0,
  isRTL,
  navigate,
  handleLogout,
}) {
  const { t } = useTranslation();

  const buttonClass =
    "py-2 w-full inline-flex items-center gap-2 rounded-xl px-2 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-emerald-800/50";
  const badgeClass =
    "absolute top-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 min-w-[18px] h-4";

  const containerBg =
    user?.theme === "dark" ? "bg-[#050909]/95" : "bg-[#f5f5f5]/95";
  const textColor =
    user?.theme === "dark" ? "text-emerald-200" : "text-gray-800";

  const badgePosition = isRTL
    ? "left-0 translate-x-[-50%]"
    : "right-0 translate-x-[50%]";

  return (
    <Motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`lg:hidden border-t border-gray-200 dark:border-emerald-800 ${containerBg} backdrop-blur-sm ${textColor}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`px-6 py-4 flex flex-col gap-4 relative ${
          isRTL ? "text-right items-end" : "text-left items-start"
        }`}
      >
        {/* Home */}
        <button
          onClick={() => {
            setMobileOpen(false);
            navigate("/");
          }}
          className={buttonClass}
        >
          <FiFeather className="w-5 h-5" />
          {t("nav.home", "Home")}
        </button>

        {/* Products */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/products");
          }}
          className={buttonClass}
        >
          🛒 {t("nav.products", "Products")}
        </button>

        {/* Favorites */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/favorites");
          }}
          className="relative"
        >
          <div className={buttonClass}>{t("navbar.favorites")}</div>
          {favoritesCount > 0 && (
            <span className={`${badgeClass} ${badgePosition}`}>
              {favoritesCount > 9 ? "9+" : favoritesCount}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/cart");
          }}
          className="relative"
        >
          <div className={buttonClass}>{t("navbar.cart")}</div>
          {cartCount > 0 && (
            <span className={`${badgeClass} ${badgePosition}`}>
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </button>

        {/* Articles */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/articles");
          }}
          className={buttonClass}
        >
          <FiBook className="w-5 h-5" />
          {t("nav.articles", "Articles")}
        </button>

        {/* Notifications */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            navigate("/notifications");
          }}
          className="relative"
        >
          <div className={`${buttonClass} justify-between`}>
            <span className="inline-flex items-center gap-2">
              <FiBell className="w-5 h-5" />
              {t("navbar.notifications")}
            </span>
          </div>
          {unreadCount > 0 && (
            <span className={`${badgeClass} ${badgePosition}`}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Delivery */}
        {(isDeliveryUser || isAdminUser) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              navigate("/delivery");
            }}
            className={buttonClass}
          >
            <FiTruck className="w-5 h-5" />
            {t("delivery.portal", "Delivery Hub")}
          </button>
        )}

        {/* Admin */}
        {isAdminUser && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              navigate("/admin");
            }}
            className={buttonClass}
          >
            <FiSettings className="w-5 h-5" />
            {t("admin.dashboard")}
          </button>
        )}

        {/* User */}
        {user ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                navigate("/account/settings");
              }}
              className={buttonClass}
            >
              <FiUser className="w-5 h-5" />
              {t("navbar.account")}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
                setMobileOpen(false);
              }}
              className={`text-red-500 ${buttonClass}`}
            >
              🚪 {t("navbar.logout")}
            </button>
          </>
        ) : (
          <div className="flex gap-2 w-full">
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate("/login");
              }}
              className="flex-1 px-3 py-1 text-sm bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 transition-all duration-200"
            >
              {t("auth.login", "Login")}
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate("/register");
              }}
              className="flex-1 px-3 py-1 text-sm border border-emerald-400 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-all duration-200"
            >
              {t("auth.register", "Register")}
            </button>
          </div>
        )}
      </div>
    </Motion.div>
  );
}
