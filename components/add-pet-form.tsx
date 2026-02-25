"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Camera,
  Search,
  CalendarDays,
  MapPin,
  Sparkles,
  Info,
  Heart,
  Shield,
  Utensils,
  Brain,
  ShoppingCart,
  Bell,
  Star,
  Sun,
  Moon,
  LogOut,
  Crosshair,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AppSidebar } from "@/components/app-sidebar"
import { type View } from "@/lib/pet-data"

interface AddPetFormProps {
  onNavigate: (view: View) => void
}

const knownConditions = [
  "Diabetes",
  "Artritis",
  "Enfermedad cardiaca",
  "Enfermedad renal",
  "Enfermedad hepatica",
  "Alergias",
  "Epilepsia",
  "Cancer",
  "Problemas dentales",
  "Problemas oculares",
  "Problemas de piel",
  "Otra",
]

export function AddPetForm({ onNavigate }: AddPetFormProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [isServiceAnimal, setIsServiceAnimal] = useState(false)
  const [isSterilized, setIsSterilized] = useState(false)
  const [livesWithOtherPets, setLivesWithOtherPets] = useState(false)

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar currentView="add-pet" onNavigate={onNavigate} />

      {/* Main Content */}
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
          {/* Back + Title */}
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("dashboard")}
              className="shrink-0"
              aria-label="Volver atras"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Agregar Nueva Mascota</h1>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {/* Basic Information */}
            <section className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-2 text-foreground">
                <Info className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Informacion Basica</h2>
              </div>

              {/* Photo Upload */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Cambiar foto
                </Button>
              </div>

              {/* Name + Species */}
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-hotel-accent">
                    Nombre de la mascota
                  </Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input placeholder="Ej: Max, Luna, Simba" />
                    <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      Corregir con IA
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Especie</Label>
                  <Select defaultValue="perro">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Seleccionar especie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perro">Perro</SelectItem>
                      <SelectItem value="gato">Gato</SelectItem>
                      <SelectItem value="ave">Ave</SelectItem>
                      <SelectItem value="reptil">Reptil</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Breed + Sex */}
              <div className="mb-1 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Raza</Label>
                  <div className="relative mt-1.5">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Buscar raza de perro..." className="pl-10" />
                  </div>
                  <p className="mt-1.5 text-xs text-blue-600">
                    Se valida y sugiere razas oficiales para evitar errores.
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Sexo</Label>
                  <Select defaultValue="macho">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Seleccionar sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="macho">Macho</SelectItem>
                      <SelectItem value="hembra">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Birth + Death date */}
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Fecha de Nacimiento</Label>
                  <div className="relative mt-1.5">
                    <Input placeholder="DD/MM/AAAA" />
                    <CalendarDays className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fecha de fallecimiento (opcional)</Label>
                  <div className="relative mt-1.5">
                    <Input placeholder="DD/MM/AAAA" />
                    <CalendarDays className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Microchip */}
              <div className="mb-4">
                <Label className="text-sm font-medium text-hotel-accent">
                  Numero de microchip
                </Label>
                <Input className="mt-1.5 max-w-sm" placeholder="Ej: 985112003476521" />
                <p className="mt-1.5 text-xs text-hotel-accent">
                  Recomendacion: implantar microchip facilita la identificacion en caso de perdida y es requisito en muchos municipios.
                </p>
              </div>

              {/* Location */}
              <div>
                <Label className="text-sm font-medium">Ubicacion (ciudad y pais)</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Ej: Bogota, Colombia" className="pl-10 pr-20" />
                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Crosshair className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Service Info */}
            <section className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <Shield className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold">Informacion de Servicio</h2>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={isServiceAnimal}
                  onCheckedChange={setIsServiceAnimal}
                />
                <Label className="text-sm text-foreground">
                  {'Es un animal de servicio o soporte emocional?'}
                </Label>
              </div>
            </section>

            {/* Health & Wellbeing */}
            <section className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-2 text-foreground">
                <Heart className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold">Salud y Bienestar</h2>
              </div>

              {/* Sterilized + General health */}
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={isSterilized}
                    onCheckedChange={setIsSterilized}
                  />
                  <Label className="text-sm text-foreground">
                    {'Esta esterilizado/castrado?'}
                  </Label>
                </div>
                <div className="sm:w-48">
                  <Label className="text-sm font-medium">Estado de Salud General</Label>
                  <Select defaultValue="saludable">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saludable">Saludable</SelectItem>
                      <SelectItem value="enfermo">Enfermo</SelectItem>
                      <SelectItem value="recuperacion">En recuperacion</SelectItem>
                      <SelectItem value="critico">Critico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Allergies + Medications */}
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Alergias (no alimentarias)</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input placeholder="Ej: polen, acaros, medicamento..." className="flex-1" />
                    <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      Corregir con IA
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Medicamentos Actuales</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input placeholder="Ej: Meloxicam 5mg cada 12h..." className="flex-1" />
                    <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      Corregir con IA
                    </Button>
                  </div>
                </div>
              </div>

              {/* Known conditions */}
              <div>
                <Label className="text-sm font-medium">Enfermedades conocidas</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input
                    placeholder="Escribe condiciones (coma o salto de linea), luego 'Detectar con IA'"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                    Detectar con IA
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {knownConditions.map((condition) => (
                    <Badge
                      key={condition}
                      variant={selectedConditions.includes(condition) ? "default" : "outline"}
                      className={`cursor-pointer text-xs transition-colors ${
                        selectedConditions.includes(condition)
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => toggleCondition(condition)}
                    >
                      {condition}
                    </Badge>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {'Escribe condiciones en lenguaje natural y presiona "Detectar con IA"; mapeamos a la lista oficial para mantener datos consistentes.'}
                </p>
              </div>
            </section>

            {/* Nutrition */}
            <section className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-2 text-foreground">
                <Utensils className="h-5 w-5 text-amber-600" />
                <h2 className="text-lg font-semibold">Nutricion</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Alimento Principal</Label>
                  <div className="relative mt-1.5">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Buscar alimento..." className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tipo de Dieta</Label>
                  <Select defaultValue="pienso">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pienso">Pienso / Croquetas</SelectItem>
                      <SelectItem value="barf">Dieta BARF</SelectItem>
                      <SelectItem value="humeda">Comida humeda</SelectItem>
                      <SelectItem value="mixta">Mixta</SelectItem>
                      <SelectItem value="casera">Casera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-sm font-medium">Cantidad Diaria de Alimento</Label>
                <Input className="mt-1.5 max-w-sm" placeholder="Ej: 2 tazas, 200g" />
              </div>
            </section>

            {/* Behavior & Lifestyle */}
            <section className="rounded-xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-2 text-foreground">
                <Brain className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold">Comportamiento y Estilo de Vida</h2>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="sm:w-64">
                  <Label className="text-sm font-medium">Nivel de Actividad</Label>
                  <Select defaultValue="medio">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bajo">Bajo</SelectItem>
                      <SelectItem value="medio">Medio</SelectItem>
                      <SelectItem value="alto">Alto</SelectItem>
                      <SelectItem value="muy-alto">Muy Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={livesWithOtherPets}
                    onCheckedChange={setLivesWithOtherPets}
                  />
                  <Label className="text-sm text-foreground">
                    {'Convive con otras mascotas?'}
                  </Label>
                </div>
              </div>
            </section>

            {/* Submit */}
            <div className="flex items-center gap-4 pb-6">
              <button
                onClick={() => onNavigate("dashboard")}
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
              >
                Cancelar
              </button>
              <Button
                onClick={() => onNavigate("dashboard")}
                className="bg-foreground text-background hover:bg-foreground/90 px-6"
              >
                Crear Mascota
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
