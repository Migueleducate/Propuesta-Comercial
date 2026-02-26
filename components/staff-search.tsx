"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ArrowLeft,
  Shield,
  MapPin,
  Fingerprint,
  Filter,
  PawPrint,
  CalendarDays,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { type View, type Pet, petDatabase } from "@/lib/pet-data"

interface StaffSearchProps {
  onNavigate: (view: View) => void
  onSelectPet: (pet: Pet, target: "owner-pet-detail" | "staff-pet-detail") => void
}

export function StaffSearch({ onNavigate, onSelectPet }: StaffSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [speciesFilter, setSpeciesFilter] = useState("all")
  const [sexFilter, setSexFilter] = useState("all")

  const results = useMemo(() => {
    let filtered = petDatabase

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.ownerEmail.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.breed.toLowerCase().includes(q) ||
          p.species.toLowerCase().includes(q) ||
          p.sex.toLowerCase().includes(q) ||
          p.birthDate.includes(q) ||
          p.microchip.includes(q)
      )
    }

    if (speciesFilter !== "all") {
      filtered = filtered.filter((p) => p.species.toLowerCase() === speciesFilter)
    }
    if (sexFilter !== "all") {
      filtered = filtered.filter((p) => p.sex.toLowerCase() === sexFilter)
    }

    return filtered
  }, [searchQuery, speciesFilter, sexFilter])

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Staff Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("landing")}
              aria-label="Volver"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Portal Staff</h1>
              <p className="text-sm text-muted-foreground">
                Busqueda interna de mascotas registradas
              </p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1.5 px-3 py-1.5 text-xs font-medium">
            <Shield className="h-3.5 w-3.5" />
            Acceso Staff
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Search Area */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por correo del dueno, nombre, microchip..."
              className="h-12 pl-12 text-base bg-background"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filtros:
            </div>
            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger className="w-40 h-9 text-sm">
                <SelectValue placeholder="Especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especies</SelectItem>
                <SelectItem value="perro">Perro</SelectItem>
                <SelectItem value="gato">Gato</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sexFilter} onValueChange={setSexFilter}>
              <SelectTrigger className="w-36 h-9 text-sm">
                <SelectValue placeholder="Sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="macho">Macho</SelectItem>
                <SelectItem value="hembra">Hembra</SelectItem>
              </SelectContent>
            </Select>
            {(speciesFilter !== "all" || sexFilter !== "all" || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={() => {
                  setSearchQuery("")
                  setSpeciesFilter("all")
                  setSexFilter("all")
                }}
              >
                Limpiar filtros
              </Button>
            )}
            <span className="ml-auto text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "resultado" : "resultados"}
            </span>
          </div>
        </div>

        {/* Results Table */}
        {results.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* Table Header */}
            <div className="hidden sm:grid sm:grid-cols-[2.5fr_2.5fr_1.5fr_1fr_1.5fr_2fr_1fr] gap-4 border-b border-border bg-muted/50 px-6 py-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mascota</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Correo del Dueno</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Especie / Raza</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sexo</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nacimiento</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Microchip</span>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</span>
            </div>

            {/* Table Rows */}
            {results.map((pet) => (
              <button
                key={pet.id}
                onClick={() => onSelectPet(pet, "staff-pet-detail")}
                className="flex flex-col sm:grid sm:grid-cols-[2.5fr_2.5fr_1.5fr_1fr_1.5fr_2fr_1fr] gap-2 sm:gap-4 items-start sm:items-center border-b border-border px-6 py-4 hover:bg-accent/50 transition-colors w-full text-left last:border-b-0"
              >
                {/* Pet name + image */}
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={pet.imageUrl}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{pet.name}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">{pet.breed}</p>
                  </div>
                  {pet.isServiceAnimal && (
                    <Badge className="bg-blue-500/90 text-white text-[10px] font-medium border-0 gap-0.5 py-0 hidden sm:flex">
                      <Shield className="h-2.5 w-2.5" />
                      Servicio
                    </Badge>
                  )}
                </div>

                {/* Owner Email */}
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-foreground min-w-0">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{pet.ownerEmail}</span>
                </div>

                {/* Species + Breed */}
                <div className="hidden sm:block">
                  <p className="text-sm text-foreground">{pet.species}</p>
                  <p className="text-xs text-muted-foreground">{pet.breed}</p>
                </div>

                {/* Sex */}
                <p className="hidden text-sm text-foreground sm:block">{pet.sex}</p>

                {/* Birth date */}
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                  {pet.birthDate}
                </div>

                {/* Microchip */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Fingerprint className="h-3.5 w-3.5" />
                  {pet.microchip}
                </div>

                {/* Health Status */}
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    pet.healthStatus === "Saludable"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-amber-200 bg-amber-50 text-amber-700"
                  }`}
                >
                  {pet.healthStatus}
                </Badge>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-base font-medium text-foreground mb-1">Sin resultados</p>
            <p className="text-sm text-muted-foreground max-w-md">
              No se encontraron mascotas que coincidan con tu busqueda. Intenta con otro nombre, raza o numero de microchip.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
