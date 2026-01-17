'use client'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg' }

export default function Button({ className = '', variant = 'primary', size = 'md', ...props }: Props) {
  const variants: Record<string, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600',
    secondary: 'bg-white text-primary-700 ring-1 ring-inset ring-primary-600/20 hover:bg-primary-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-50',
  }
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
