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
  Syringe,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Mail,
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
import { type View, type Vaccine } from "@/lib/pet-data"
import { usePetContext } from "@/lib/pet-context"

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

const healthStatusMap: Record<string, string> = {
  saludable: "Saludable",
  enfermo: "Cuidado Especial",
  recuperacion: "Cuidado Especial",
  critico: "Cuidado Especial",
}

const activityMap: Record<string, string> = {
  bajo: "Bajo",
  medio: "Medio",
  alto: "Alto",
  "muy-alto": "Muy Alto",
}

const speciesMap: Record<string, string> = {
  perro: "Perro",
  gato: "Gato",
  ave: "Ave",
  reptil: "Reptil",
  otro: "Otro",
}

const sexMap: Record<string, string> = {
  macho: "Macho",
  hembra: "Hembra",
}

const dietMap: Record<string, string> = {
  pienso: "Pienso / Croquetas",
  barf: "Dieta BARF",
  humeda: "Comida humeda",
  mixta: "Mixta",
  casera: "Casera",
}

function calculateAge(birthDateStr: string): string {
  const parts = birthDateStr.split("/")
  if (parts.length !== 3) return "0 anos"
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)
  const birth = new Date(year, month, day)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--
  }
  if (age < 1) {
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()
    return months <= 1 ? "1 mes" : `${months} meses`
  }
  return age === 1 ? "1 ano" : `${age} anos`
}

interface VaccineFormEntry {
  id: string
  name: string
  date: string
  vetId: string
  status: "Vigente" | "Vencida"
  isEditing: boolean
}

interface FormErrors {
  [key: string]: string
}

export function AddPetForm({ onNavigate }: AddPetFormProps) {
  const { addPet } = usePetContext()

  // Basic info
  const [petName, setPetName] = useState("")
  const [species, setSpecies] = useState("perro")
  const [breed, setBreed] = useState("")
  const [sex, setSex] = useState("macho")
  const [birthDate, setBirthDate] = useState("")
  const [microchip, setMicrochip] = useState("")
  const [location, setLocation] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")

  // Service
  const [isServiceAnimal, setIsServiceAnimal] = useState(false)

  // Health
  const [isSterilized, setIsSterilized] = useState(false)
  const [healthStatus, setHealthStatus] = useState("saludable")
  const [allergies, setAllergies] = useState("")
  const [medications, setMedications] = useState("")
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])

  // Nutrition
  const [foodMain, setFoodMain] = useState("")
  const [dietType, setDietType] = useState("pienso")
  const [dailyAmount, setDailyAmount] = useState("")

  // Behavior
  const [activityLevel, setActivityLevel] = useState("medio")
  const [livesWithOtherPets, setLivesWithOtherPets] = useState(false)

  // Vaccines
  const [vaccines, setVaccines] = useState<VaccineFormEntry[]>([])

  // Validation
  const [errors, setErrors] = useState<FormErrors>({})
  const [showSuccess, setShowSuccess] = useState(false)

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    )
  }

  // --- Vaccine management ---
  const addVaccine = () => {
    setVaccines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        date: "",
        vetId: "",
        status: "Vigente",
        isEditing: true,
      },
    ])
  }

  const updateVaccine = (id: string, field: keyof VaccineFormEntry, value: string) => {
    setVaccines((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    )
  }

  const deleteVaccine = (id: string) => {
    setVaccines((prev) => prev.filter((v) => v.id !== id))
  }

  const toggleEditVaccine = (id: string) => {
    setVaccines((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isEditing: !v.isEditing } : v))
    )
  }

  // --- Validation ---
  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!petName.trim()) newErrors.petName = "El nombre es obligatorio"
    if (!breed.trim()) newErrors.breed = "La raza es obligatoria"
    if (!birthDate.trim()) newErrors.birthDate = "La fecha de nacimiento es obligatoria"
    if (!microchip.trim()) newErrors.microchip = "El microchip es obligatorio"
    if (!location.trim()) newErrors.location = "La ubicacion es obligatoria"
    if (!ownerEmail.trim()) newErrors.ownerEmail = "El correo del dueno es obligatorio"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail))
      newErrors.ownerEmail = "Ingresa un correo valido"

    // Validate incomplete vaccines
    const incompleteVaccine = vaccines.find((v) => !v.name.trim() || !v.date.trim())
    if (incompleteVaccine) {
      newErrors.vaccines = "Completa todos los campos de cada vacuna (nombre y fecha son requeridos)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // --- Submit ---
  const handleSubmit = () => {
    if (!validate()) return

    const finalVaccines: Vaccine[] = vaccines.map((v) => ({
      name: v.name,
      date: v.date,
      vetId: v.vetId || "N/A",
      status: v.status,
    }))

    const newPet = {
      id: crypto.randomUUID(),
      name: petName.trim(),
      species: speciesMap[species] || species,
      breed: breed.trim(),
      sex: sexMap[sex] || sex,
      birthDate: birthDate.trim(),
      age: calculateAge(birthDate.trim()),
      microchip: microchip.trim(),
      location: location.trim(),
      imageUrl: species === "gato" ? "/images/luna-cat.jpg" : "/images/champeta-dog.jpg",
      isServiceAnimal,
      isSterilized,
      healthStatus: healthStatusMap[healthStatus] || "Saludable",
      allergies: allergies.trim() || "Ninguna conocida",
      medications: medications.trim() || "Ninguno",
      diseases: selectedConditions,
      vaccines: finalVaccines,
      foodMain: foodMain.trim() || "Sin especificar",
      dietType: dietMap[dietType] || dietType,
      dailyAmount: dailyAmount.trim() || "Sin especificar",
      activityLevel: activityMap[activityLevel] || activityLevel,
      coexistsWithOtherPets: livesWithOtherPets,
      ownerEmail: ownerEmail.trim(),
    }

    addPet(newPet)
    setShowSuccess(true)
    setTimeout(() => {
      onNavigate("dashboard")
    }, 1500)
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

          {/* Success Toast */}
          {showSuccess && (
            <div className="mx-auto mb-6 max-w-3xl">
              <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">Mascota creada exitosamente</p>
                  <p className="text-xs text-green-600">Redirigiendo al dashboard...</p>
                </div>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-3xl space-y-6">
            {/* Owner Email - Prominent */}
            <section className="rounded-xl border-2 border-blue-200 bg-card p-6">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <Mail className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Contacto del Huesped</h2>
              </div>
              <div>
                <Label className="text-sm font-medium text-blue-700">
                  Correo electronico del dueno *
                </Label>
                <Input
                  value={ownerEmail}
                  onChange={(e) => {
                    setOwnerEmail(e.target.value)
                    if (errors.ownerEmail) setErrors((prev) => ({ ...prev, ownerEmail: "" }))
                  }}
                  placeholder="Ej: carlos.mendez@ejemplo.com"
                  className={`mt-1.5 ${errors.ownerEmail ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                  type="email"
                />
                {errors.ownerEmail && (
                  <p className="mt-1 text-xs text-red-500">{errors.ownerEmail}</p>
                )}
                <p className="mt-1.5 text-xs text-blue-600">
                  Este correo es el identificador unico del huesped en el sistema.
                </p>
              </div>
            </section>

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
                    Nombre de la mascota *
                  </Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input
                      value={petName}
                      onChange={(e) => {
                        setPetName(e.target.value)
                        if (errors.petName) setErrors((prev) => ({ ...prev, petName: "" }))
                      }}
                      placeholder="Ej: Max, Luna, Simba"
                      className={errors.petName ? "border-red-400 focus-visible:ring-red-400" : ""}
                    />
                    <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      Corregir con IA
                    </Button>
                  </div>
                  {errors.petName && (
                    <p className="mt-1 text-xs text-red-500">{errors.petName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Especie *</Label>
                  <Select value={species} onValueChange={setSpecies}>
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
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Raza *</Label>
                  <div className="relative mt-1.5">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={breed}
                      onChange={(e) => {
                        setBreed(e.target.value)
                        if (errors.breed) setErrors((prev) => ({ ...prev, breed: "" }))
                      }}
                      placeholder="Buscar raza..."
                      className={`pl-10 ${errors.breed ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                    />
                  </div>
                  {errors.breed ? (
                    <p className="mt-1 text-xs text-red-500">{errors.breed}</p>
                  ) : (
                    <p className="mt-1.5 text-xs text-blue-600">
                      Se valida y sugiere razas oficiales para evitar errores.
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium">Sexo *</Label>
                  <Select value={sex} onValueChange={setSex}>
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

              {/* Birth date */}
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Fecha de Nacimiento *</Label>
                  <div className="relative mt-1.5">
                    <Input
                      value={birthDate}
                      onChange={(e) => {
                        setBirthDate(e.target.value)
                        if (errors.birthDate) setErrors((prev) => ({ ...prev, birthDate: "" }))
                      }}
                      placeholder="DD/MM/AAAA"
                      className={errors.birthDate ? "border-red-400 focus-visible:ring-red-400" : ""}
                    />
                    <CalendarDays className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.birthDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.birthDate}</p>
                  )}
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
                  Numero de microchip *
                </Label>
                <Input
                  value={microchip}
                  onChange={(e) => {
                    setMicrochip(e.target.value)
                    if (errors.microchip) setErrors((prev) => ({ ...prev, microchip: "" }))
                  }}
                  className={`mt-1.5 max-w-sm ${errors.microchip ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                  placeholder="Ej: 985112003476521"
                />
                {errors.microchip ? (
                  <p className="mt-1 text-xs text-red-500">{errors.microchip}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-hotel-accent">
                    Recomendacion: implantar microchip facilita la identificacion en caso de perdida y es requisito en muchos municipios.
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <Label className="text-sm font-medium">Ubicacion (ciudad y pais) *</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value)
                      if (errors.location) setErrors((prev) => ({ ...prev, location: "" }))
                    }}
                    placeholder="Ej: Bogota, Colombia"
                    className={`pl-10 pr-20 ${errors.location ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                  />
                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Crosshair className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {errors.location && (
                  <p className="mt-1 text-xs text-red-500">{errors.location}</p>
                )}
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
                  <Select value={healthStatus} onValueChange={setHealthStatus}>
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

              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Alergias (no alimentarias)</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="Ej: polen, acaros, medicamento..."
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      Corregir con IA
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Medicamentos Actuales</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      placeholder="Ej: Meloxicam 5mg cada 12h..."
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      Corregir con IA
                    </Button>
                  </div>
                </div>
              </div>

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

            {/* Vaccines */}
            <section className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                  <Syringe className="h-5 w-5 text-teal-600" />
                  <h2 className="text-lg font-semibold">Vacunas</h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={addVaccine}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Agregar vacuna
                </Button>
              </div>

              {errors.vaccines && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
                  <p className="text-xs text-red-600">{errors.vaccines}</p>
                </div>
              )}

              {vaccines.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-10 text-center">
                  <Syringe className="mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">No hay vacunas registradas</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Haz clic en "Agregar vacuna" para empezar.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {vaccines.map((vaccine, idx) => (
                    <div
                      key={vaccine.id}
                      className={`rounded-lg border p-4 transition-colors ${
                        vaccine.isEditing
                          ? "border-teal-200 bg-teal-50/50"
                          : "border-border bg-background"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Vacuna #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          {!vaccine.isEditing && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              onClick={() => toggleEditVaccine(vaccine.id)}
                              aria-label="Editar vacuna"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {vaccine.isEditing && vaccine.name.trim() && vaccine.date.trim() && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-green-600 hover:text-green-700"
                              onClick={() => toggleEditVaccine(vaccine.id)}
                              aria-label="Confirmar vacuna"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-400 hover:text-red-600"
                            onClick={() => deleteVaccine(vaccine.id)}
                            aria-label="Eliminar vacuna"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      {vaccine.isEditing ? (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <Label className="text-xs font-medium">Nombre de la vacuna *</Label>
                            <Input
                              value={vaccine.name}
                              onChange={(e) => updateVaccine(vaccine.id, "name", e.target.value)}
                              placeholder="Ej: Rabia, Parvovirus..."
                              className="mt-1 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium">Fecha de aplicacion *</Label>
                            <Input
                              value={vaccine.date}
                              onChange={(e) => updateVaccine(vaccine.id, "date", e.target.value)}
                              placeholder="DD/MM/AAAA"
                              className="mt-1 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium">ID Veterinario</Label>
                            <Input
                              value={vaccine.vetId}
                              onChange={(e) => updateVaccine(vaccine.id, "vetId", e.target.value)}
                              placeholder="Ej: VET-84729"
                              className="mt-1 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium">Estado</Label>
                            <Select
                              value={vaccine.status}
                              onValueChange={(val) =>
                                updateVaccine(vaccine.id, "status", val)
                              }
                            >
                              <SelectTrigger className="mt-1 h-9 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Vigente">Vigente</SelectItem>
                                <SelectItem value="Vencida">Vencida</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                          <span className="text-sm font-medium text-foreground">{vaccine.name}</span>
                          <span className="text-sm text-muted-foreground">{vaccine.date}</span>
                          {vaccine.vetId && (
                            <span className="text-xs text-muted-foreground font-mono">{vaccine.vetId}</span>
                          )}
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              vaccine.status === "Vigente"
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                            }`}
                          >
                            {vaccine.status}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                    <Input
                      value={foodMain}
                      onChange={(e) => setFoodMain(e.target.value)}
                      placeholder="Buscar alimento..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tipo de Dieta</Label>
                  <Select value={dietType} onValueChange={setDietType}>
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
                <Input
                  value={dailyAmount}
                  onChange={(e) => setDailyAmount(e.target.value)}
                  className="mt-1.5 max-w-sm"
                  placeholder="Ej: 2 tazas, 200g"
                />
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
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
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
                onClick={handleSubmit}
                disabled={showSuccess}
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
