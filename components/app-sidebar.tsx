"use client"

import {
  LayoutDashboard,
  PawPrint,
  ShoppingBag,
  Star,
  Users,
  CalendarDays,
  User,
  Bot,
  Sparkles,
  MapPin,
  MessageSquare,
  Crown,
  ChevronDown,
} from "lucide-react"

import { type View } from "@/lib/pet-data"

interface AppSidebarProps {
  currentView: View
  onNavigate: (view: View) => void
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" as View },
  { icon: PawPrint, label: "Mis Mascotas", view: "dashboard" as View },
  { icon: ShoppingBag, label: "Marketplace", view: "dashboard" as View },
  { icon: Star, label: "guruPoints", view: "dashboard" as View },
  { icon: Users, label: "Referidos", view: "dashboard" as View },
  { icon: CalendarDays, label: "Mis Citas", view: "dashboard" as View },
  { icon: User, label: "Perfil", view: "dashboard" as View },
  { icon: Bot, label: "PetChoice IA", view: "dashboard" as View },
  { icon: Sparkles, label: "Tu Guru IA", view: "dashboard" as View },
  { icon: MapPin, label: "Mascotas Perdidas", view: "dashboard" as View },
  { icon: Users, label: "Comunidad", view: "dashboard" as View },
  { icon: MessageSquare, label: "Mensajes", view: "dashboard" as View },
  { icon: Crown, label: "Membresías", view: "dashboard" as View },
]

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hotel-accent">
          <PawPrint className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const isActive = item.label === "Mis Mascotas" && currentView === "dashboard"
            return (
              <li key={item.label}>
                <button
                  onClick={() => onNavigate(item.view)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-hotel-accent text-white"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="flex flex-col gap-2 border-t border-border px-4 py-4">
        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Tutor
          </span>
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm text-foreground">
          <span>Espanol</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        <button className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm text-foreground">
          <span>{'USD $ \u2014 Dolar Estadounidense'}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </aside>
  )
}
