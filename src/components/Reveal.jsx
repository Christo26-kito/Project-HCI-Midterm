import { motion } from 'framer-motion'

export const GLIDE = [0.16, 1, 0.3, 1]
export const SETTLE = [0.34, 1.56, 0.64, 1]

export default function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: GLIDE }}
    >
      {children}
    </motion.div>
  )
}
