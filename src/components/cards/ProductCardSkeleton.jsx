import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div
      className="
        w-full max-w-[300px] mx-auto
        rounded-2xl border border-gray-200
        p-4 space-y-4 animate-pulse
        bg-white
      "
    >
      {/* Image */}
      <div className="w-full aspect-[3/4] rounded-xl bg-gray-200" />

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />

      {/* Price */}
      <div className="h-5 bg-gray-300 rounded w-1/3 mt-2" />

      {/* Button */}
      <div className="h-10 bg-gray-300 rounded-xl mt-4" />
    </div>
  );
}
