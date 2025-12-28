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
  FiSearch,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import SearchBar from "../search/SearchBar";

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
      className={`
        lg:hidden fixed inset-x-0 top-full z-50
        backdrop-blur-xl
        border-t border-white/20
        bg-gradient-to-b
        from-[#FFF7E6]/95 via-[#FFF1D6]/95 to-[#FFE9B5]/95
        dark:from-[#0B2F2A]/95 dark:via-[#0E3A34]/95 dark:to-[#0B2F2A]/95
        text-[#2F2A1F] dark:text-[#D9F3EC]
        overflow-x-hidden
      `}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`px-6 py-6 flex flex-col gap-5 ${
          isRTL ? "text-right items-end" : ""
        }`}
      >
        {/* 🔍 SEARCH BAR (Centered & Separated) */}
        <div className="w-full flex justify-center mb-2">
          <div className="w-full max-w-md">
            <SearchBar
              placeholder={t("navbar.search_placeholder")}
              className="
                bg-white/70 dark:bg-emerald-900/40
                border border-amber-300/40 dark:border-emerald-700/40
                rounded-2xl
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              "
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-1" />

        {/* NAV ITEMS */}
        <MenuButton
          icon={<FiFeather />}
          text={t("nav.home", "Home")}
          onClick={() => navigate("/")}
          setMobileOpen={setMobileOpen}
        />
        <MenuButton
          icon={<FiShoppingCart />}
          text={t("nav.products", "Products")}
          onClick={() => navigate("/products")}
          setMobileOpen={setMobileOpen}
        />
        <MenuButton
          icon={<FiHeart />}
          text={t("navbar.favorites")}
          onClick={() => navigate("/favorites")}
          setMobileOpen={setMobileOpen}
        />
        <MenuButton
          icon={<FiBook />}
          text={t("nav.articles", "Articles")}
          onClick={() => navigate("/articles")}
          setMobileOpen={setMobileOpen}
        />

        {/* 🔔 Notifications with badge */}
        <button
          onClick={() => {
            setMobileOpen(false);
            navigate("/notifications");
          }}
          className="w-full flex items-center justify-between py-2 px-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <span className="inline-flex items-center gap-3">
            <FiBell className="w-5 h-5 text-amber-600 dark:text-emerald-300" />
            {t("navbar.notifications")}
          </span>
          {unreadCount > 0 && (
            <span className="min-w-[22px] text-center rounded-full bg-red-500 text-white text-xs px-2 py-0.5 shadow">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {(isDeliveryUser || isAdminUser) && (
          <MenuButton
            icon={<FiTruck />}
            text={t("delivery.portal", "Delivery Hub")}
            onClick={() => navigate("/delivery")}
            setMobileOpen={setMobileOpen}
          />
        )}

        {isAdminUser && (
          <MenuButton
            icon={<FiSettings />}
            text={t("admin.dashboard")}
            onClick={() => navigate("/admin")}
            setMobileOpen={setMobileOpen}
          />
        )}

        {user && (
          <>
            <MenuButton
              icon={<FiUser />}
              text={t("navbar.account")}
              onClick={() => navigate("/account/settings")}
              setMobileOpen={setMobileOpen}
            />
            <button
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
              className="mt-2 py-2 px-1 text-red-500 hover:text-red-600 inline-flex items-center gap-3"
            >
              🚪 {t("navbar.logout")}
            </button>
          </>
        )}
      </div>
    </Motion.div>
  );
}

/* 🔹 Reusable Button (UI only – no logic change) */
function MenuButton({ icon, text, onClick, setMobileOpen }) {
  return (
    <button
      onClick={() => {
        setMobileOpen(false);
        onClick();
      }}
      className="
        w-full inline-flex items-center gap-3
        py-2 px-1 rounded-xl
        hover:bg-black/5 dark:hover:bg-white/5
        transition-colors
      "
    >
      <span className="text-amber-700 dark:text-emerald-300">{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
}
