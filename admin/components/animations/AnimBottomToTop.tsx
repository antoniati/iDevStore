"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { AnimBottomToTopProps } from "@/types";

export const AnimBottomToTop = ({ children, delay = 0 }: AnimBottomToTopProps) => {
      const controls = useAnimation();

      useEffect(() => {
            controls.start({
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, delay },
            });
      }, [controls, delay]);

      return (
            <motion.div
                  className="w-full flex items-center justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={controls}
            >
                  {children}
            </motion.div>
      );
};