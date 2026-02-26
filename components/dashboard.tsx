"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Heart,
  Sparkles,
  ShoppingCart,
  Bell,
  Star,
  Sun,
  Moon,
  LogOut,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import Image from "next/image"
import { type View, type Pet } from "@/lib/pet-data"
import { usePetContext } from "@/lib/pet-context"

interface DashboardProps {
  onNavigate: (view: View) => void
  onSelectPet: (pet: Pet, target: "owner-pet-detail" | "staff-pet-detail") => void
}

const filters = ["Todos", "Perros", "Gatos", "Sano", "Senior"]

export function Dashboard({ onNavigate, onSelectPet }: DashboardProps) {
  const { pets } = usePetContext()
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPets = useMemo(() => {
    let result = pets

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.breed.toLowerCase().includes(q)
      )
    }

    if (activeFilter === "Perros") result = result.filter((p) => p.species === "Perro")
    else if (activeFilter === "Gatos") result = result.filter((p) => p.species === "Gato")
    else if (activeFilter === "Sano") result = result.filter((p) => p.healthStatus === "Saludable")
    else if (activeFilter === "Senior") result = result.filter((p) => parseInt(p.age) >= 7)

    return result
  }, [activeFilter, searchQuery, pets])

  const stats = [
    { value: String(pets.length), label: "Mascotas Totales" },
    { value: String(pets.filter((p) => p.healthStatus === "Saludable").length), label: "Mascotas Sanas" },
    { value: String(pets.filter((p) => p.vaccines.some((v) => v.status === "Vencida")).length), label: "Proximas Vacunas" },
    { value: String(pets.filter((p) => parseInt(p.age) >= 7).length), label: "Mascotas Senior" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar currentView="dashboard" onNavigate={onNavigate} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-end gap-3 border-b border-border bg-card px-6 py-3">
          <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            250
          </span>
          <span className="text-sm text-muted-foreground">{'USD $ \u2014 Dolar Est...'}</span>
          <div className="flex items-center gap-1.5">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <div className="h-5 w-9 rounded-full bg-muted" />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesion
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mis Mascotas</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Gestiona los perfiles de tus mascotas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-sm">
                Reordenar
              </Button>
              <Button
                onClick={() => onNavigate("add-pet")}
                className="bg-foreground text-background hover:bg-foreground/90 gap-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                Agregar Mascota
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-5 text-center"
              >
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, raza..."
                className="pl-10 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="ml-2 flex items-center gap-1 rounded-lg border border-border p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "list"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Pet Cards Grid */}
          {filteredPets.length > 0 ? (
            <div className={viewMode === "grid"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col gap-3"
            }>
              {filteredPets.map((pet) => (
                viewMode === "grid"
                  ? <PetCard key={pet.id} pet={pet} onClick={() => onSelectPet(pet, "owner-pet-detail")} />
                  : <PetListItem key={pet.id} pet={pet} onClick={() => onSelectPet(pet, "owner-pet-detail")} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
              <Search className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No se encontraron mascotas</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function PetCard({ pet, onClick }: { pet: Pet; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md text-left w-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pet.imageUrl}
          alt={`${pet.name} - ${pet.breed}`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <Badge className="bg-card/90 text-foreground backdrop-blur-sm text-xs font-medium border-0">
            {pet.species}
          </Badge>
          {pet.isServiceAnimal && (
            <Badge className="bg-blue-500/90 text-white backdrop-blur-sm text-xs font-medium border-0 gap-1">
              <Shield className="h-3 w-3" />
              Perro de Servicio
            </Badge>
          )}
        </div>
        <div className="absolute right-3 top-3">
          <span className={`flex h-5 w-5 items-center justify-center rounded-full backdrop-blur-sm ${
            pet.healthStatus === "Saludable" ? "bg-green-500/90" : "bg-amber-500/90"
          }`}>
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">{pet.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {pet.breed} &middot; {pet.age}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
            {pet.healthStatus}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
            {pet.activityLevel}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5" />
            Salud
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            IA
          </span>
        </div>
      </div>
    </button>
  )
}

function PetListItem({ pet, onClick }: { pet: Pet; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md text-left w-full"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
        <Image
          src={pet.imageUrl}
          alt={`${pet.name} - ${pet.breed}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{pet.name}</h3>
          {pet.isServiceAnimal && (
            <Badge className="bg-blue-500/90 text-white text-[10px] font-medium border-0 gap-1 py-0">
              <Shield className="h-2.5 w-2.5" />
              Servicio
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {pet.breed} &middot; {pet.species} &middot; {pet.age}
        </p>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          pet.healthStatus === "Saludable"
            ? "bg-green-50 text-green-700"
            : "bg-amber-50 text-amber-700"
        }`}>
          {pet.healthStatus}
        </span>
        <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
          {pet.location}
        </span>
      </div>
    </button>
  )
}
