'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router, mounted])

    // Prevent hydration mismatch and flash of protected content
    if (!mounted) return null

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}
