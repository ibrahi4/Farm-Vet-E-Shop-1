import { motion as Motion } from "framer-motion";
import { UseTheme } from "../../theme/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";

export default function Hero({ title, subtitle }) {
  const { theme } = UseTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRTL = i18n.dir() === "rtl";
  const handleCTA = () => navigate("/products");

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" },
    }),
  };

  return (
    <div
      dir={i18n.dir()}
      className="
        relative z-10
        flex flex-col justify-center
        h-full
        px-4 sm:px-6 md:px-10 lg:px-16
      "
    >
      <Motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className={`
          max-w-3xl w-full mx-auto
          space-y-4 sm:space-y-6
          break-words
          ${isRTL ? "text-right" : "text-left"}
        `}
      >
        {/* Badge */}
        <Motion.div
          variants={fadeUp}
          custom={0.05}
          className={`
            inline-flex items-center gap-2 rounded-full px-3 py-1
            text-xs sm:text-sm md:text-base font-medium
            backdrop-blur-sm border shadow
            ${isRTL ? "self-end" : "self-start"}
            ${
              theme === "dark"
                ? "bg-black/30 text-emerald-100 border-white/10"
                : "bg-white/60 text-emerald-700 border-emerald-200"
            }
          `}
        >
          <span
            className={`h-2 w-2 rounded-full animate-pulse ${
              theme === "dark" ? "bg-emerald-300" : "bg-emerald-600"
            }`}
          />
          {t("home.heroBadge")}
        </Motion.div>

        {/* Title */}
        <Motion.h1
          variants={fadeUp}
          custom={0.15}
          className={`
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            font-extrabold
            leading-tight sm:leading-snug
            tracking-tight
            ${theme === "dark" ? "text-emerald-100" : "text-white"}
          `}
        >
          {title}
        </Motion.h1>

        {/* Subtitle */}
        <Motion.p
          variants={fadeUp}
          custom={0.3}
          className={`
            text-sm sm:text-base md:text-lg
            max-w-xl
            leading-relaxed
            ${isRTL ? "ml-auto" : ""}
            ${theme === "dark" ? "text-emerald-100/80" : "text-white/90"}
          `}
        >
          {subtitle}
        </Motion.p>

        {/* CTA Buttons */}
        <Motion.div
          variants={fadeUp}
          custom={0.5}
          className={`
            flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 flex-wrap
            ${isRTL ? "justify-end" : "justify-start"}
          `}
        >
          <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              text={t("home.shopAllProducts")}
              onClick={handleCTA}
              className={`
                h-10 sm:h-12 px-6 sm:px-8 rounded-xl font-bold transition
                ${
                  theme === "dark"
                    ? "bg-emerald-300 text-slate-900 hover:bg-emerald-200"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }
              `}
            />
          </Motion.div>

          <Motion.button
            variants={fadeUp}
            custom={0.6}
            onClick={handleCTA}
            className={`
              inline-flex items-center gap-2 px-4 sm:px-5 py-2
              rounded-full border backdrop-blur-sm
              text-xs sm:text-sm md:text-base transition
              ${
                theme === "dark"
                  ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  : "bg-white/50 text-emerald-800 border-emerald-200 hover:bg-white/80"
              }
            `}
          >
            <span className="h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full bg-emerald-400 text-slate-900 font-bold text-[10px] sm:text-xs shadow-md">
              ✓
            </span>
            {t("home.heroSecondaryCta")}
          </Motion.button>
        </Motion.div>

        {/* Features */}
        <Motion.div
          variants={fadeUp}
          custom={0.8}
          className="
            mt-6 sm:mt-10
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-4 sm:gap-6
            text-xs sm:text-sm md:text-base font-medium
          "
        >
          <Feature
            text="2,500+ trusted farm products"
            theme={theme}
            isRTL={isRTL}
          />
          <Feature
            text="AI-powered farming insights"
            theme={theme}
            isRTL={isRTL}
          />
          <Feature text="Fast delivery & support" theme={theme} isRTL={isRTL} />
        </Motion.div>
      </Motion.div>
    </div>
  );
}

const Feature = ({ text, theme, isRTL }) => (
  <div
    className={`flex items-center gap-2 ${
      isRTL ? "justify-end flex-row-reverse" : "justify-start"
    }`}
  >
    <span className="h-2 w-2 bg-emerald-400 rounded-full" />
    <span className={theme === "dark" ? "text-emerald-100" : "text-white"}>
      {text}
    </span>
  </div>
);
