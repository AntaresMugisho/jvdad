'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, ensureSession, isCheckingAuth } = useAuthStore()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            ensureSession().catch((error) => {
                console.error('Échec de la vérification de session', error)
            })
        }
    }, [mounted, ensureSession])

    useEffect(() => {
        if (mounted && !isCheckingAuth && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router, mounted, isCheckingAuth])

    // Prevent hydration mismatch and flash of protected content
    if (!mounted) return null

    if (!isAuthenticated || isCheckingAuth) {
        return null
    }

    return <>{children}</>
}
