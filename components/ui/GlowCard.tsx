'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
}

export default function GlowCard({ children, className = '', as: Tag = 'div' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    ref.current?.style.setProperty('--gx', `${e.clientX - rect.left}px`)
    ref.current?.style.setProperty('--gy', `${e.clientY - rect.top}px`)
  }

  const onMouseLeave = () => {
    ref.current?.style.setProperty('--glow-opacity', '0')
  }

  const onMouseEnter = () => {
    ref.current?.style.setProperty('--glow-opacity', '1')
  }

  return (
    <div
      ref={ref}
      className={`glow-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
