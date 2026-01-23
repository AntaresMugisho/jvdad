import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface DashboardStats {
    totalProjects: number
    activeProjects: number
    beneficiaries: number
    totalBudget: number
}

export interface RecentActivity {
    id: string
    type: 'project' | 'post' | 'user'
    action: string
    target: string
    date: string
}

interface DashboardState {
    stats: DashboardStats
    recentActivity: RecentActivity[]
    isLoading: boolean
    fetchData: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set) => ({
            stats: {
                totalProjects: 12,
                activeProjects: 5,
                beneficiaries: 1500,
                totalBudget: 45000,
            },
            recentActivity: [
                { id: '1', type: 'project', action: 'Nouveau projet créé', target: 'Agroforesterie Sud-Kivu', date: new Date().toISOString() },
                { id: '2', type: 'user', action: 'Nouvel utilisateur', target: 'Jean Mulamba', date: new Date(Date.now() - 86400000).toISOString() },
                { id: '3', type: 'post', action: 'Article publié', target: 'Techniques de compostage', date: new Date(Date.now() - 172800000).toISOString() },
            ],
            isLoading: false,
            fetchData: async () => {
                set({ isLoading: true })
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000))
                set({ isLoading: false })
            },
        }),
        {
            name: 'jvdad-dashboard-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
