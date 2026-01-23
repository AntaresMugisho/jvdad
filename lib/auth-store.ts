import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    email: string
    name?: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    login: (email: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (email: string) => {
                // Mock login logic: accept any email
                const user = { email, name: email.split('@')[0] }
                set({ user, isAuthenticated: true })
            },
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'jvdad-auth-storage', // unique name
            storage: createJSONStorage(() => localStorage),
        }
    )
)
