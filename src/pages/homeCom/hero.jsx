// src/pages/homeCom/hero.jsx
import { motion as Motion } from "framer-motion";
import { UseTheme } from "../../theme/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";

export default function Hero({ title, subtitle }) {
  const { theme } = UseTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCTA = () => navigate("/products");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative">
      {/* CARD */}
      <Motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="
          relative overflow-hidden rounded-xl shadow-2xl
          min-h-[420px] md:min-h-[520px] lg:min-h-[560px]
        "
      >
        {/* ================= BACKGROUND IMAGE ================= */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/265242/pexels-photo-265242.jpeg?q=85&fit=crop)",
          }}
        />

        {/* ================= OVERLAY (WORKS IN BOTH MODES) ================= */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10 lg:p-14">
          {/* TEXT BLOCK */}
          <div className="max-w-2xl space-y-6">
            {/* BADGE */}
            <Motion.div
              variants={fadeUp}
              custom={0.05}
              className="
                inline-flex items-center gap-2 rounded-full px-4 py-1.5
                text-xs md:text-sm font-medium
                bg-black/40 text-white border border-white/20
                backdrop-blur-md
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {t("home.heroBadge")}
            </Motion.div>

            {/* TITLE */}
            <Motion.h1
              variants={fadeUp}
              custom={0.15}
              className="
                text-3xl md:text-5xl lg:text-6xl
                font-extrabold tracking-tight leading-tight
                text-slate-50 drop-shadow-lg
              "
            >
              {title}
            </Motion.h1>

            {/* SUBTITLE */}
            <Motion.p
              variants={fadeUp}
              custom={0.3}
              className="
                text-sm md:text-lg max-w-xl leading-relaxed
                text-slate-200 drop-shadow
              "
            >
              {subtitle}
            </Motion.p>

            {/* CTA */}
            <Motion.div
              variants={fadeUp}
              custom={0.5}
              className="flex flex-wrap items-center gap-4"
            >
              <Motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  text={t("home.shopAllProducts")}
                  onClick={handleCTA}
                  className="
                    h-12 px-8 rounded-xl font-bold
                    bg-emerald-500 text-white
                    hover:bg-emerald-600
                    shadow-lg
                  "
                />
              </Motion.div>

              <Motion.button
                variants={fadeUp}
                custom={0.6}
                type="button"
                onClick={handleCTA}
                className="
                  inline-flex items-center gap-2 rounded-full px-5 py-2
                  text-sm font-medium
                  bg-white/10 text-white
                  border border-white/30
                  backdrop-blur-md
                  hover:bg-white/20 transition
                "
              >
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-emerald-400 text-slate-900 text-xs font-bold">
                  ✓
                </span>
                {t("home.heroSecondaryCta")}
              </Motion.button>
            </Motion.div>
          </div>

          {/* FEATURES */}
          <Motion.div
            variants={fadeUp}
            custom={0.8}
            className="
              mt-10 grid grid-cols-2 md:grid-cols-3 gap-4
              text-xs md:text-sm font-medium
              text-slate-200
            "
          >
            <Feature text="2,500+ trusted farm products" />
            <Feature text="AI-powered farming insights" />
            <Feature text="Fast delivery & support" />
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  );
}

const Feature = ({ text }) => (
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 bg-emerald-400 rounded-full" />
    {text}
  </div>
);
