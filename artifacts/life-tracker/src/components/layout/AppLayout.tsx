import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Activity, BookOpen, Clock, Compass, Crosshair, GraduationCap, LayoutDashboard } from "lucide-react";
import { Header } from "./Header";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Academics", icon: GraduationCap, url: "/academics" },
  { title: "AI/ML Pipeline", icon: Activity, url: "/ai-pipeline" },
  { title: "Time Management", icon: Clock, url: "/time-management" },
  { title: "MS Abroad", icon: Compass, url: "/ms-abroad" },
  { title: "Spiritual Core", icon: Crosshair, url: "/spiritual" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] w-full bg-background text-foreground font-sans">
        <Sidebar className="border-r border-sidebar-border bg-sidebar" variant="sidebar">
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <div className="size-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 glow-border">
                <Crosshair className="size-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold tracking-tight text-foreground text-sm uppercase">Command Center</span>
                <span className="text-xs text-muted-foreground">Shuvo's Terminal</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location === item.url}
                        className={location === item.url ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-sidebar-foreground"}
                      >
                        <Link href={item.url} className="flex items-center gap-3 px-4 py-2 font-medium">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Header />
          <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
