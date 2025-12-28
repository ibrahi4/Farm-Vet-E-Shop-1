// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, signOut } from "../../features/auth/authSlice";
import { UseTheme } from "../../theme/ThemeProvider";
import { motion as Motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiBell,
  FiGlobe,
  FiSun,
  FiMoon,
  FiMenu,
  FiFeather,
} from "react-icons/fi";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import SearchBar from "../search/SearchBar";
import { useUserNotifications } from "../../hooks/useUserNotifications";
import { playFullNotification } from "../../utils/voiceNotification";
import throttle from "lodash.throttle";
import MobileMenu from "./MobileMenu";

/* ================= Memoized Buttons ================= */

const iconBtn =
  "relative h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-200  " +
  "bg-gray-100 hover:bg-gray-200 text-gray-700 " +
  "dark:bg-emerald-900/40 dark:hover:bg-emerald-800/60 dark:text-emerald-200";

const badge =
  "absolute -top-1 -right-1 min-w-[18px] px-1 text-xs rounded-full text-white";

const FavoritesButton = React.memo(({ navigate, favorites }) => (
  <button onClick={() => navigate("/favorites")} className={iconBtn}>
    <FiHeart size={18} />
    {favorites.length > 0 && (
      <span className={`${badge} bg-pink-500`}>{favorites.length}</span>
    )}
  </button>
));

const CartButton = React.memo(({ navigate, cartCount }) => (
  <button onClick={() => navigate("/cart")} className={iconBtn}>
    <FiShoppingCart size={18} />
    {cartCount > 0 && (
      <span className={`${badge} bg-emerald-600`}>{cartCount}</span>
    )}
  </button>
));

const NotificationsButton = React.memo(({ navigate, unreadCount }) => (
  <button onClick={() => navigate("/notifications")} className={iconBtn}>
    <FiBell size={18} />
    {unreadCount > 0 && (
      <span className={`${badge} bg-red-500`}>
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    )}
  </button>
));

/* ================= Navbar ================= */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const previousUnreadCountRef = useRef(0);
  const { theme, toggle } = UseTheme();
  const user = useSelector(selectCurrentUser);
  const cartItems = useSelector((s) => s.cart?.items || []);
  const favorites = useSelector((s) => s.favorites?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { unreadCount } = useUserNotifications(user?.uid);

  const isAdminUser = user?.role === "admin";
  const isDeliveryUser = user?.role === "delivery";
  const isRTL = currentLang === "ar";

  useEffect(() => {
    const onScroll = throttle(() => setScrolled(window.scrollY > 20), 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (unreadCount > previousUnreadCountRef.current && !isAdminUser) {
      playFullNotification(
        `You have ${unreadCount} new notifications`,
        currentLang === "ar" ? "ar-EG" : "en-US"
      );
    }
    previousUnreadCountRef.current = unreadCount;
  }, [unreadCount, currentLang, isAdminUser]);

  const cartCount = useMemo(
    () => cartItems.reduce((s, i) => s + (i?.quantity || 1), 0),
    [cartItems]
  );

  const hideNavbar =
    ["/login", "/register", "/reset"].includes(location.pathname) ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/delivery");

  if (hideNavbar) return null;

  return (
    <>
      <header
        dir={isRTL ? "rtl" : "ltr"}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-white/95 dark:bg-[#020a0a]/95 shadow-lg"
              : "bg-white/80 dark:bg-[#020a0a]/80"
          }
          backdrop-blur-md border-b border-gray-200 dark:border-emerald-900/40`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between h-16"
          >
            {/* LOGO */}
            <NavLink to="/" className="flex items-center gap-2 font-bold">
              <span
                className="h-8 w-8 flex items-center justify-center rounded-xl
                bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
              >
                <FiFeather />
              </span>
              <span className="hidden sm:block text-gray-800 dark:text-emerald-200">
                {t("brand.name")}
              </span>
            </NavLink>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex gap-8 font-semibold">
              {["/", "/products", "/articles"].map((path, i) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-600 hover:text-emerald-600 dark:text-emerald-200 dark:hover:text-emerald-400"
                    }`
                  }
                >
                  {t(["nav.home", "nav.products", "nav.articles"][i])}
                </NavLink>
              ))}
              {isAdminUser && (
                <NavLink
                  to="/admin"
                  className="text-purple-600 dark:text-purple-400"
                >
                  Admin
                </NavLink>
              )}
            </nav>
            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div
                className={`hidden lg:block w-64 ${isRTL ? "ml-20" : "mr-20"}`}
              >
                <SearchBar />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggle}
                className={(iconBtn, " text-emerald-200")}
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>

              {/* Language Toggle */}
              <button
                onClick={async () => {
                  const lang = currentLang === "en" ? "ar" : "en";
                  await i18n.changeLanguage(lang);
                  setCurrentLang(lang);
                }}
                className={iconBtn}
              >
                <FiGlobe />
              </button>

              {/* Icons + Auth Buttons */}
              <div
                className={`hidden md:flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                {user && (
                  <NotificationsButton
                    navigate={navigate}
                    unreadCount={unreadCount}
                  />
                )}
                <FavoritesButton navigate={navigate} favorites={favorites} />
                <CartButton navigate={navigate} cartCount={cartCount} />
                {user && (
                  <button
                    onClick={() => navigate("/account/settings")}
                    className={iconBtn}
                  >
                    <FiUser />
                  </button>
                )}

                {/* Login / Register */}
                {!user && (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="px-3 py-1 text-sm bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 transition-all duration-200"
                    >
                      {t("auth.login")}
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="px-3 py-1 text-sm border border-emerald-400 text-emerald-400 rounded-xl hover:bg-emerald-100 transition-all duration-200"
                    >
                      {t("auth.register")}
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className={`md:hidden ${iconBtn}`}
              >
                <FiMenu size={20} />
              </button>
            </div>
          </Motion.div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            setMobileOpen={setMobileOpen}
            user={user}
            isAdminUser={isAdminUser}
            isDeliveryUser={isDeliveryUser}
            unreadCount={unreadCount}
            isRTL={isRTL}
            navigate={navigate}
            handleLogout={() => dispatch(signOut())}
          />
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
}
