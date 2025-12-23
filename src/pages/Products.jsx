// src/pages/Products.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsArrowUp, BsArrowDown, BsSearch } from "react-icons/bs";
import Footer from "../Authcomponents/Footer";
import { UseTheme } from "../theme/ThemeProvider";
import { useProductsSorted } from "../hooks/useProductsSorted";
import { useCategoriesSorted } from "../hooks/useCategoriesSorted";
import ProductCard from "../components/cards/ProductCard";

const SORT_FIELDS = [
  { value: "createdAt", label: "Newest" },
  { value: "price", label: "Price" },
  { value: "title", label: "Alphabetical" },
];

export default function Products() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";
  const { theme } = UseTheme();
  const isDark = theme === "dark";

  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [dir, setDir] = useState("desc");
  const [categoryFilter, setCategoryFilter] = useState(categoryId || "all");

  const ITEMS_PER_PAGE = 8;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCategoryFilter(categoryId || "all");
    setPage(1);
  }, [categoryId]);

  const { data: categories = [] } = useCategoriesSorted({ dir: "asc" });
  const { data: all = [] } = useProductsSorted({ sortBy, dir, qText: q });

  const filteredList = useMemo(() => {
    let list = all;

    if (categoryFilter !== "all") {
      list = list.filter((p) => p.categoryId === categoryFilter);
    }

    if (q.trim()) {
      list = list.filter((p) =>
        (p.name || p.title || "").toLowerCase().includes(q.toLowerCase())
      );
    }

    return list;
  }, [all, q, categoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredList.length / ITEMS_PER_PAGE)
  );

  const paginatedProducts = filteredList.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-[#111c1b] text-white" : "bg-gray-50 text-slate-900"
      }`}
    >
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6">
        {/* ===== TITLE ===== */}
        <div className="py-8">
          <h1
            className={`text-3xl md:text-4xl font-extrabold ${
              isDark ? "text-emerald-300" : "text-emerald-700"
            }`}
          >
            {t("products.title", "Our Products")}
          </h1>
        </div>

        {/* ===== FILTER BAR (Amazon Style) ===== */}
        <div
          className={`sticky top-0 z-30 mb-8 rounded-xl border shadow-sm backdrop-blur-md
            ${
              isDark
                ? "bg-[#162524]/90 border-white/10"
                : "bg-white/90 border-gray-200"
            }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4">
            {/* Search */}
            <div className="relative md:col-span-5">
              <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder={t("products.search", "Search products")}
                className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none
                  ${
                    isDark
                      ? "bg-white/10 border border-white/20 text-white placeholder-white/60"
                      : "bg-gray-50 border border-gray-300"
                  }`}
              />
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className={`md:col-span-4 px-3 py-3 rounded-lg text-sm
                ${
                  isDark
                    ? "bg-white/10 border border-white/20 text-white"
                    : "bg-gray-50 border border-gray-300"
                }`}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <div className="md:col-span-3 flex gap-2">
              <button
                onClick={() => setDir((p) => (p === "asc" ? "desc" : "asc"))}
                className={`px-3 py-3 rounded-lg border
                  ${
                    isDark
                      ? "bg-white/10 border-white/20"
                      : "bg-gray-50 border-gray-300"
                  }`}
              >
                {dir === "asc" ? <BsArrowUp /> : <BsArrowDown />}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`flex-1 px-3 py-3 rounded-lg text-sm
                  ${
                    isDark
                      ? "bg-white/10 border border-white/20 text-white"
                      : "bg-gray-50 border border-gray-300"
                  }`}
              >
                {SORT_FIELDS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ===== PRODUCTS GRID ===== */}
        <ul
          className="
            grid gap-6
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
          "
        >
          {paginatedProducts.map((p, index) => (
            <li key={p.id} className="flex justify-center">
              <ProductCard product={p} index={index} />
            </li>
          ))}
        </ul>

        {/* ===== PAGINATION ===== */}
        {filteredList.length > 0 && (
          <div className="flex justify-center items-center gap-4 my-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white disabled:opacity-40"
            >
              Prev
            </button>

            <span
              className={`px-4 py-2 rounded-xl border
                ${
                  isDark
                    ? "bg-[#1d2f2d] border-white/10"
                    : "bg-white border-gray-200"
                }`}
            >
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
