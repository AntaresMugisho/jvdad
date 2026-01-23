import { IconType } from 'react-icons'

interface StatCardProps {
    icon: IconType
    value: string
    label: string
    color?: string
}

export default function StatCard({ icon: Icon, value, label, color = 'var(--primary-green)' }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center gap-4">
                <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${color}15` }}
                >
                    <Icon className="text-3xl" style={{ color }} />
                </div>
                <div>
                    <div className="text-3xl font-bold" style={{ color }}>
                        {value}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">{label}</div>
                </div>
            </div>
        </div>
    )
}
