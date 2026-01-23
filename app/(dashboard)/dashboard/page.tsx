"use client";

import { Card } from "@/components/ui/card";
import { FileText, FolderOpen, TrendingUp, Users, DollarSign } from "lucide-react";
import { useDashboardStore } from "@/lib/dashboard-store";
import { useEffect } from "react";

export default function Dashboard() {
  const { stats, recentActivity, isLoading, fetchData } = useDashboardStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const statCards = [
    {
      label: "Projets Totaux",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "text-blue-500",
    },
    {
      label: "Projets Actifs",
      value: stats.activeProjects,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      label: "Bénéficiaires",
      value: stats.beneficiaries.toLocaleString(),
      icon: Users,
      color: "text-purple-500",
    },
    {
      label: "Budget Total",
      value: `${stats.totalBudget.toLocaleString()} $`,
      icon: DollarSign,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Tableau de bord JVDAD</h1>
        <p className="text-muted-foreground mt-1">
          Vue d'ensemble des activités et de l'impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-2" data-testid={`text-stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Activités Récentes</h2>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Chargement...</p>
          ) : recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune activité récente</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className={`p-2 rounded-full ${activity.type === 'project' ? 'bg-blue-100 text-blue-600' : activity.type === 'user' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                    {activity.type === 'project' ? <FolderOpen size={16} /> : activity.type === 'user' ? <Users size={16} /> : <FileText size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.target}</p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(activity.date).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center text-center space-y-4">
          <div className="p-4 bg-green-50 rounded-full">
            <TrendingUp className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Impact Mensuel</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
              Les données montrent une augmentation de 15% des bénéficiaires ce mois-ci.
            </p>
          </div>
          <button className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline">
            Voir le rapport complet
          </button>
        </Card>
      </div>
    </div>
  );
}
