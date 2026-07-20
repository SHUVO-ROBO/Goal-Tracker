import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarTrigger, SidebarFooter,
} from "@/components/ui/sidebar";
import { Activity, BookOpen, Clock, Compass, LayoutDashboard, GraduationCap, Star } from "lucide-react";
import { Header } from "./Header";

const navItems = [
  { title: "Dashboard",       icon: LayoutDashboard, url: "/",               color: "text-primary" },
  { title: "Academics",       icon: GraduationCap,   url: "/academics",       color: "text-primary" },
  { title: "AI/ML Pipeline",  icon: Activity,        url: "/ai-pipeline",     color: "text-secondary" },
  { title: "Time Management", icon: Clock,           url: "/time-management", color: "text-muted-foreground" },
  { title: "MS Abroad",       icon: Compass,         url: "/ms-abroad",       color: "text-primary" },
  { title: "Spiritual Core",  icon: Star,            url: "/spiritual",       color: "text-warning" },
];

// ── Theme config ──────────────────────────────────────────────────────────────
export type ThemeKey = "navy" | "desert" | "teal";

const THEMES: { key: ThemeKey; label: string; desc: string; swatch: string; ring: string }[] = [
  { key: "navy",   label: "Night Mosque",  desc: "Midnight navy · Gold",  swatch: "#1e2d4a", ring: "#D4AF37" },
  { key: "desert", label: "Desert Dusk",  desc: "Warm brown · Amber",     swatch: "#2a1e14", ring: "#e08c28" },
  { key: "teal",   label: "Madinah Teal", desc: "Deep teal · Gold",       swatch: "#0d2320", ring: "#D4AF37" },
];

function applyTheme(key: ThemeKey) {
  const root = document.documentElement;
  root.classList.add("dark");
  if (key === "navy") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", key);
  }
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [theme, setTheme] = useState<ThemeKey>(() => {
    return (localStorage.getItem("life_tracker_theme") as ThemeKey) || "navy";
  });
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("life_tracker_theme", theme);
  }, [theme]);

  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] w-full bg-background text-foreground font-sans">
        <Sidebar className="border-r border-sidebar-border bg-sidebar" variant="sidebar">

          {/* ── Logo ── */}
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 px-1">
              <div className="relative size-9 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center glow-border shrink-0">
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
                          asChild isActive={active}
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

          {/* ── Footer: theme switcher + bismillah ── */}
          <SidebarFooter className="p-4 border-t border-sidebar-border space-y-3">

            {/* Theme picker */}
            <div>
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Theme</span>
                <div className="flex items-center gap-1">
                  {THEMES.map(t => (
                    <span
                      key={t.key}
                      className="size-3 rounded-full border-2 transition-all"
                      style={{
                        background: t.swatch,
                        borderColor: theme === t.key ? t.ring : "transparent",
                        outline: theme === t.key ? `1px solid ${t.ring}` : "none",
                        outlineOffset: "1px",
                      }}
                    />
                  ))}
                </div>
              </button>

              {showThemePicker && (
                <div className="mt-2 space-y-1">
                  {THEMES.map(t => (
                    <button
                      key={t.key}
                      onClick={() => { setTheme(t.key); setShowThemePicker(false); }}
                      className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-all ${
                        theme === t.key
                          ? "bg-primary/15 border border-primary/30"
                          : "hover:bg-sidebar-accent border border-transparent"
                      }`}
                    >
                      <span
                        className="size-5 rounded-md shrink-0 border"
                        style={{ background: t.swatch, borderColor: t.ring + "60" }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground leading-none">{t.label}</div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{t.desc}</div>
                      </div>
                      {theme === t.key && (
                        <span className="ml-auto text-[10px] text-primary font-mono">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bismillah */}
            <div className="text-center">
              <div className="font-amiri text-primary/60 text-xs leading-relaxed">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </div>
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5 uppercase tracking-widest">
                MIT · Stanford · ETH Zurich
              </div>
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
