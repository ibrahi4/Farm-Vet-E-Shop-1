// src/pages/Home.jsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./homeCom/hero";
import CategoriesSection from "./homeCom/CategoriesSection";
import Articles from "./homeCom/Articles";
import EcoBanner from "./homeCom/EcoBanner";
import FeaturedProducts from "./homeCom/FeaturedProducts";
import Footer from "../Authcomponents/Footer";
import { useCategoriesSorted } from "../hooks/useCategoriesSorted";
import { localizeArticleRecord } from "../data/articles";
import useArticles from "../hooks/useArticles";
import { useCategoryRepresentativeImages } from "../hooks/useCategoryRepresentativeImages";
import { useTranslation } from "react-i18next";
import { UseTheme } from "../theme/ThemeProvider";

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme } = UseTheme();
  const isDark = theme === "dark";
  const isRTL = i18n.language === "ar";

  const { data: catData = [] } = useCategoriesSorted({ dir: "desc" });
  const { articles: allFeaturedArticles } = useArticles({ featureHome: true });

  const featuredArticles = allFeaturedArticles.filter(
    (a) => a.status === "published"
  );
  const locale = i18n.language || "en";
  const localizedFeatured = featuredArticles.map((article) =>
    localizeArticleRecord(article, locale)
  );

  const categoryIds = useMemo(
    () => catData.map((c) => c.id).filter(Boolean),
    [catData]
  );
  const { data: categoryImages = {} } =
    useCategoryRepresentativeImages(categoryIds);

  const categories = catData.map((category) => ({
    id: category.id,
    title: category.name || t("home.categoryFallback"),
    note: category.note || t("home.categoryNoteFallback"),
    imageSources: [
      ...(categoryImages[category.id] || []),
      ...(category.img ? [category.img] : []),
    ],
    onClick: () => navigate(`/category/${category.id}`),
  }));

  const articles = localizedFeatured.map((article) => ({
    title: article.title,
    excerpt: article.summary,
    img:
      article.heroImage ||
      `https://dummyimage.com/400x300/0f172a/ffffff&text=${t(
        "home.articleFallback"
      )}`,
  }));

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className={`flex flex-col transition-colors duration-500 ${
        isDark
          ? "bg-[#02130f] bg-gradient-to-b from-[#02130f] via-[#022519] to-[#033624] text-slate-100"
          : "bg-white text-slate-900"
      }`}
    >
      {/* ===================== HERO ===================== */}
      <section
        className="relative w-full min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/265242/pexels-photo-265242.jpeg?q=85&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isDark ? "bg-black/60" : "bg-black/30"
          }`}
        />
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 flex justify-center items-center">
          <Hero title={t("home.heroTitle")} subtitle={t("home.heroSubtitle")} />
        </div>
      </section>

      {/* ===================== CATEGORIES ===================== */}
      <section className={isDark ? "py-10" : "py-12"}>
        <div className="container mx-auto px-4">
          <CategoriesSection
            header={t("home.shopByCategory")}
            items={categories}
          />
        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS ===================== */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>

      {/* ===================== ARTICLES ===================== */}
      {articles.length > 0 && (
        <section className="pb-10">
          <div className="container mx-auto px-4">
            <Articles header={t("home.topArticles")} items={articles} />
          </div>
        </section>
      )}

      {/* ===================== ECO BANNER ===================== */}
      <section className="pb-3">
        <div className="container mx-auto px-4">
          <EcoBanner />
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </main>
  );
}
