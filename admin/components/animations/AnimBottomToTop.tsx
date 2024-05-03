"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimBottomToTop {
      children: React.ReactNode;
      delay?: number;
};

export const AnimBottomToTop = ({ children, delay = 0 }: AnimBottomToTop) => {
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