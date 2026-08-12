import { motion } from 'framer-motion'
import type { ElementType } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type AnimatedTextProps = {
  text: string
  as?: ElementType
  className?: string
}

export function AnimatedText({ text, as: Tag = 'span', className }: AnimatedTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const words = text.split(' ')

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
