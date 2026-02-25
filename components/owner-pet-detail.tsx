"use client"

import {
  ArrowLeft,
  Info,
  Shield,
  Heart,
  Utensils,
  Brain,
  MapPin,
  CalendarDays,
  ShoppingCart,
  Bell,
  Star,
  Sun,
  Moon,
  LogOut,
  Fingerprint,
  Activity,
  PawPrint,
  Check,
  X,
  Syringe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import Image from "next/image"
import { type View, type Pet } from "@/lib/pet-data"

interface OwnerPetDetailProps {
  pet: Pet
  onNavigate: (view: View) => void
}

export function OwnerPetDetail({ pet, onNavigate }: OwnerPetDetailProps) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar currentView="owner-pet-detail" onNavigate={onNavigate} />

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

        <main className="flex-1 overflow-y-auto bg-muted/30 p-6 lg:p-8">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate("dashboard")}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Pet Hero Card */}
            <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex flex-col sm:flex-row">
                <div className="relative aspect-square w-full sm:w-56 shrink-0">
                  <Image
                    src={pet.imageUrl}
                    alt={`${pet.name} - ${pet.breed}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">{pet.name}</h1>
                    <span className={`inline-flex h-3 w-3 rounded-full ${
                      pet.healthStatus === "Saludable" ? "bg-green-500" : "bg-amber-500"
                    }`} />
                  </div>
                  <p className="text-muted-foreground">
                    {pet.breed} &middot; {pet.species} &middot; {pet.sex}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{pet.age}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      {pet.location}
                    </Badge>
                    {pet.isServiceAnimal && (
                      <Badge className="bg-blue-500/90 text-white text-xs font-medium border-0 gap-1">
                        <Shield className="h-3 w-3" />
                        Animal de Servicio
                      </Badge>
                    )}
                    <Badge variant="outline" className={`text-xs ${
                      pet.healthStatus === "Saludable"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}>
                      {pet.healthStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Sections */}
            <div className="space-y-6">
              {/* Basic Information */}
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-5 flex items-center gap-2 text-foreground">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-semibold">Informacion Basica</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailRow icon={PawPrint} label="Especie" value={pet.species} />
                  <DetailRow icon={PawPrint} label="Raza" value={pet.breed} />
                  <DetailRow icon={PawPrint} label="Sexo" value={pet.sex} />
                  <DetailRow icon={CalendarDays} label="Fecha de Nacimiento" value={pet.birthDate} />
                  <DetailRow icon={CalendarDays} label="Edad" value={pet.age} />
                  <DetailRow icon={Fingerprint} label="Microchip" value={pet.microchip} />
                  <DetailRow icon={MapPin} label="Ubicacion" value={pet.location} />
                </div>
              </section>

              {/* Service Information */}
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-5 flex items-center gap-2 text-foreground">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold">Informacion de Servicio</h2>
                </div>
                <div className="flex items-center gap-3">
                  {pet.isServiceAnimal ? (
                    <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                      <Check className="h-4 w-4" />
                      Es un animal de servicio o soporte emocional
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                      <X className="h-4 w-4" />
                      No es un animal de servicio
                    </span>
                  )}
                </div>
              </section>

              {/* Health & Wellbeing */}
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-5 flex items-center gap-2 text-foreground">
                  <Heart className="h-5 w-5 text-red-500" />
                  <h2 className="text-lg font-semibold">Salud y Bienestar</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailRow
                    icon={Heart}
                    label="Estado de Salud"
                    value={pet.healthStatus}
                    highlight={pet.healthStatus !== "Saludable"}
                  />
                  <DetailRow
                    icon={Shield}
                    label="Esterilizado/Castrado"
                    value={pet.isSterilized ? "Si" : "No"}
                  />
                  <DetailRow icon={Activity} label="Alergias" value={pet.allergies} />
                  <DetailRow icon={Activity} label="Medicamentos" value={pet.medications} />
                </div>
                {pet.diseases.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Enfermedades conocidas</p>
                    <div className="flex flex-wrap gap-2">
                      {pet.diseases.map((d) => (
                        <Badge key={d} variant="outline" className="text-xs border-red-200 bg-red-50 text-red-700">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Nutrition */}
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-5 flex items-center gap-2 text-foreground">
                  <Utensils className="h-5 w-5 text-amber-600" />
                  <h2 className="text-lg font-semibold">Nutricion</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailRow icon={Utensils} label="Alimento Principal" value={pet.foodMain} />
                  <DetailRow icon={Utensils} label="Tipo de Dieta" value={pet.dietType} />
                  <DetailRow icon={Utensils} label="Cantidad Diaria" value={pet.dailyAmount} />
                </div>
              </section>

              {/* Vaccine History */}
              {pet.vaccines && pet.vaccines.length > 0 && (
                <section className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-5 flex items-center gap-2 text-foreground">
                    <Syringe className="h-5 w-5 text-teal-600" />
                    <h2 className="text-lg font-semibold">Historial de Vacunas</h2>
                  </div>
                  <div className="space-y-3">
                    {pet.vaccines.map((v, i) => (
                      <div
                        key={`${v.name}-${i}`}
                        className="flex items-center justify-between rounded-lg border border-border p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                            v.status === "Vigente"
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-500"
                          }`}>
                            <Syringe className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{v.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {v.date} &middot; Vet: {v.vetId}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            v.status === "Vigente"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-red-200 bg-red-50 text-red-700"
                          }`}
                        >
                          {v.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Behavior & Lifestyle */}
              <section className="rounded-xl border border-border bg-card p-6">
                <div className="mb-5 flex items-center gap-2 text-foreground">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <h2 className="text-lg font-semibold">Comportamiento y Estilo de Vida</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DetailRow icon={Activity} label="Nivel de Actividad" value={pet.activityLevel} />
                  <DetailRow
                    icon={PawPrint}
                    label="Convive con otras mascotas"
                    value={pet.coexistsWithOtherPets ? "Si" : "No"}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className={`text-sm ${highlight ? "font-medium text-amber-600" : "text-foreground"}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
