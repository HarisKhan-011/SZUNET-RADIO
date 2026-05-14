import { motion, useReducedMotion } from 'framer-motion'

export default function RevealOnScroll({ children, className = '', delay = 0 }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06, margin: '0px 0px -24px 0px' }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
