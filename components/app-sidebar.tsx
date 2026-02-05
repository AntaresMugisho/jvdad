"use client";

import { FileText, FolderOpen, Shield, User, Home, LogOut, Building2, Quote, Image as ImageIcon, Briefcase } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";


const menuItems = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Blog",
    url: "/articles",
    icon: FileText,
  },
  {
    title: "Galerie",
    url: "/gallery",
    icon: ImageIcon,
  },
  {
    title: "Projets",
    url: "/projects",
    icon: Briefcase,
  },
  // {
  //   title: "Fichiers",
  //   url: "/fichiers",
  //   icon: FolderOpen,
  // },
  {
    title: "Témoignages",
    url: "/testimonials",
    icon: Quote,
  },
  {
    title: "Information",
    url: "/company",
    icon: Building2,
  },
  {
    title: "Profil",
    url: "/profil",
    icon: User,
  },
  {
    title: "Sécurité",
    url: "/securite",
    icon: Shield,
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className={isActive ? "bg-green-100 text-primary font-semibold border-l-4 border-green-500" : ""}
                    >
                      <Link href={item.url as any}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="w-full justify-start"
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
