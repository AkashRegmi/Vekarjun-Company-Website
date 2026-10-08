import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
};

export default function ScrollReveal({ children }: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
