import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { authApi } from '@/lib/api'
import { tokenStorage } from '@/stores/token-store'

interface User {
    email: string
    name?: string
    first_name?: string
    last_name?: string
    photo?: string
}

interface LoginResult {
    success: boolean
    error?: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    isCheckingAuth: boolean
    error: string | null
    login: (email: string, password: string) => Promise<LoginResult>
    logout: () => Promise<void>
    ensureSession: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isCheckingAuth: false,
            error: null,

            async login(email: string, password: string): Promise<LoginResult> {
                if (get().isLoading) {
                    return { success: false, error: 'Connexion déjà en cours' }
                }

                set({ isLoading: true, error: null })

                try {
                    const response = await authApi.login(email, password)


                    const accessToken = response.access
                    if (!accessToken) {
                        throw new Error('Jeton d\'authentification manquant dans la réponse')
                    }

                    const refreshToken = response.refresh
                    await tokenStorage.setTokens({
                        accessToken,
                        refreshToken,
                    })

                    const user = await authApi.me()

                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    })

                    return { success: true }
                } catch (error: any) {
                    const message = error?.message ?? 'Impossible de se connecter'

                    await tokenStorage.clearTokens()

                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: message,
                    })

                    return { success: false, error: message }
                }
            },
            async logout() {
                try {
                    await authApi.logout()
                } catch (error) {
                    console.error('Erreur lors de la déconnexion', error)
                } finally {
                    await tokenStorage.clearTokens()
                    set({ user: null, isAuthenticated: false, error: null })
                }
            },

            async ensureSession() {
                if (get().isCheckingAuth) {
                    return get().isAuthenticated
                }

                set({ isCheckingAuth: true })

                try {
                    const accessToken = await tokenStorage.getAccessToken()

                    if (!accessToken) {
                        throw new Error('Aucun jeton d\'accès enregistré')
                    }

                    const user = await authApi.me()

                    set({
                        user,
                        isAuthenticated: true,
                        error: null,
                    })

                    return true
                } catch (error) {
                    await tokenStorage.clearTokens()
                    set({ user: null, isAuthenticated: false, error: null })
                    return false
                } finally {
                    set({ isCheckingAuth: false })
                }
            },
        }),
        {
            name: 'jvdad-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)
