import { create } from 'zustand'
import { dashboardApi } from '@/lib/api'

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
    error?: string | null
    fetchData: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
    stats: {
        totalProjects: 0,
        activeProjects: 0,
        beneficiaries: 0,
        totalBudget: 0,
    },
    recentActivity: [],
    isLoading: false,
    error: null,
    fetchData: async () => {
        set({ isLoading: true, error: null })
        try {
            const data = await dashboardApi.overview()
            set({
                stats: {
                    totalProjects: data?.total_projects ?? 0,
                    activeProjects: data?.active_projects ?? 0,
                    beneficiaries: data?.total_beneficiaries ?? 0,
                    totalBudget: data?.total_budget ?? 0,
                },
                recentActivity: Array.isArray(data?.recent_activity)
                    ? data.recent_activity.map((activity: any, index: number) => ({
                        id: String(activity?.id ?? index),
                        type: (activity?.type ?? 'project') as RecentActivity['type'],
                        action: activity?.action ?? activity?.description ?? 'Activité',
                        target: activity?.target ?? activity?.title ?? 'N/A',
                        date: activity?.date ?? new Date().toISOString(),
                    }))
                    : [],
                isLoading: false,
            })
        } catch (error) {
            console.error('Failed to load dashboard overview', error)
            set({ error: 'Impossible de charger les données du tableau de bord.', isLoading: false })
        }
    },
}))
