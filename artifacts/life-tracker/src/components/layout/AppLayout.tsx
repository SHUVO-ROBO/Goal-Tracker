import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger, SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Activity, BookOpen, Clock, Compass, LayoutDashboard, GraduationCap, Star
} from "lucide-react";
import { Header } from "./Header";

const navItems = [
  { title: "Dashboard",       icon: LayoutDashboard, url: "/",               color: "text-primary" },
  { title: "Academics",       icon: GraduationCap,   url: "/academics",       color: "text-primary" },
  { title: "AI/ML Pipeline",  icon: Activity,        url: "/ai-pipeline",     color: "text-secondary" },
  { title: "Time Management", icon: Clock,           url: "/time-management", color: "text-muted-foreground" },
  { title: "MS Abroad",       icon: Compass,         url: "/ms-abroad",       color: "text-primary" },
  { title: "Spiritual Core",  icon: Star,            url: "/spiritual",       color: "text-warning" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] w-full bg-background text-foreground font-sans">
        <Sidebar className="border-r border-sidebar-border bg-sidebar" variant="sidebar">

          {/* ── Logo / Brand ── */}
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 px-1">
              {/* Islamic-style emblem */}
              <div className="relative size-9 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center glow-border shrink-0">
                {/* crescent-star SVG */}
                <svg viewBox="0 0 24 24" className="size-5 text-primary fill-current">
                  <path d="M12 2a9.93 9.93 0 0 0-4 .83 8 8 0 1 1 10.55 10.55A9.93 9.93 0 0 0 20 10 10 10 0 0 0 12 2Z"/>
                  <polygon points="17,3 18.2,6.2 21.5,6.2 18.9,8.1 19.9,11.3 17,9.5 14.1,11.3 15.1,8.1 12.5,6.2 15.8,6.2" className="fill-primary"/>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-mono font-bold tracking-tight text-foreground text-sm uppercase">Shuvo's</span>
                <span className="font-amiri text-primary text-sm leading-none">Command Center</span>
              </div>
            </div>
          </SidebarHeader>

          {/* ── Nav ── */}
          <SidebarContent className="py-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {navItems.map((item) => {
                    const active = location === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          className={
                            active
                              ? "bg-primary/12 text-primary border-l-2 border-primary rounded-l-none"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }
                        >
                          <Link href={item.url} className="flex items-center gap-3 px-4 py-2.5 font-medium text-sm">
                            <item.icon className={`size-4 shrink-0 ${active ? "text-primary" : item.color}`} />
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

          {/* ── Footer ── */}
          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <div className="text-center font-amiri text-primary/60 text-xs leading-relaxed">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            <div className="text-center text-[10px] text-muted-foreground font-mono mt-1 uppercase tracking-widest">
              MIT · Stanford · ETH Zurich
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <div className="md:hidden fixed top-3 left-3 z-50">
            <SidebarTrigger className="bg-card border border-border shadow-sm" />
          </div>
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
