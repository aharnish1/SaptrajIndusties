import React from "react";
import { motion } from "framer-motion";

const FacilityHotspot = ({
  facility,
  isSelected,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        absolute
        rounded-md
        cursor-pointer
        group
        transition-all
        duration-300

        ${isSelected
          ? "border-2 border-amber-500 bg-amber-500/20 z-20"
          : "border border-transparent hover:border-amber-400 hover:bg-amber-500/10 z-10"
        }
      `}
      style={{
        top: facility.position.top,
        left: facility.position.left,
        width: facility.position.width,
        height: facility.position.height,
      }}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      role="button"
      tabIndex={0}
      aria-label={facility.name}
    >
      {/* Hover Tooltip */}
      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          -top-10

          opacity-0
          group-hover:opacity-100

          transition-all
          duration-300

          bg-black/95
          border
          border-amber-500

          text-white
          text-xs
          font-medium

          px-3
          py-1.5

          rounded-md
          whitespace-nowrap

          pointer-events-none
        "
      >
        {facility.name}
      </div>

      {/* Selected Pulse Effect */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-amber-500"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
};

export default FacilityHotspot;