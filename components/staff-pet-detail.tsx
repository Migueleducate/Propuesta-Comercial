"use client"

import {
  ArrowLeft,
  Shield,
  MapPin,
  CalendarDays,
  Fingerprint,
  Activity,
  PawPrint,
  Heart,
  Utensils,
  Brain,
  Syringe,
  Printer,
  Pencil,
  AlertTriangle,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { type View, type Pet } from "@/lib/pet-data"

interface StaffPetDetailProps {
  pet: Pet
  onNavigate: (view: View) => void
}

export function StaffPetDetail({ pet, onNavigate }: StaffPetDetailProps) {
  const expiredVaccines = pet.vaccines.filter((v) => v.status === "Vencida")
  const hasAlerts =
    pet.diseases.length > 0 ||
    expiredVaccines.length > 0 ||
    pet.allergies !== "Ninguna conocida"

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Corporate Header */}
      <header className="border-b-2 border-gray-300 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate("staff-search")}
              aria-label="Volver"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-gray-900 tracking-tight uppercase">
                  Expediente de Mascota - Uso Interno
                </h1>
                <Badge className="bg-gray-700 text-white text-[10px] font-mono border-0 uppercase tracking-widest">
                  ID: {pet.id.padStart(5, "0")}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                Microchip: {pet.microchip} | Registro activo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-medium"
              onClick={() => window.print()}
            >
              <Printer className="h-3.5 w-3.5" />
              Imprimir Ficha
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-medium"
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar Registro
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Alert Banner */}
        {hasAlerts && (
          <div className="mb-5 rounded-lg border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <div>
                <p className="text-sm font-bold text-red-800 uppercase tracking-wide">Alertas activas</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {pet.allergies !== "Ninguna conocida" && (
                    <Badge className="bg-red-600 text-white text-xs border-0">
                      Alergias: {pet.allergies}
                    </Badge>
                  )}
                  {pet.diseases.map((d) => (
                    <Badge key={d} className="bg-red-600 text-white text-xs border-0">
                      {d}
                    </Badge>
                  ))}
                  {expiredVaccines.map((v) => (
                    <Badge
                      key={v.name}
                      className="bg-amber-600 text-white text-xs border-0"
                    >
                      Vacuna vencida: {v.name}
                    </Badge>
                  ))}
                  {pet.isServiceAnimal && (
                    <Badge className="bg-blue-700 text-white text-xs border-0">
                      Animal de Servicio
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Left Column - Identification */}
          <div className="space-y-5">
            {/* Pet ID Card */}
            <section className="rounded-lg border border-gray-300 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <PawPrint className="h-4 w-4" />
                  Identificacion del Paciente
                </h2>
              </div>
              <div className="p-5">
                <div className="flex gap-5">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                      src={pet.imageUrl}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <table className="flex-1 text-sm">
                    <tbody>
                      <DataRow label="Nombre" value={pet.name} />
                      <DataRow label="Especie" value={pet.species} />
                      <DataRow label="Raza" value={pet.breed} />
                      <DataRow label="Sexo" value={pet.sex} />
                      <DataRow label="Nacimiento" value={pet.birthDate} />
                      <DataRow label="Edad" value={pet.age} />
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Registration */}
            <section className="rounded-lg border border-gray-300 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" />
                  Datos de Registro
                </h2>
              </div>
              <div className="p-5">
                <table className="w-full text-sm">
                  <tbody>
                    <DataRow label="Microchip" value={pet.microchip} mono />
                    <DataRow label="Ubicacion" value={pet.location} />
                    <DataRow
                      label="Animal de Servicio"
                      value={pet.isServiceAnimal ? "Si" : "No"}
                      badge={pet.isServiceAnimal ? "blue" : undefined}
                    />
                    <DataRow
                      label="Esterilizado"
                      value={pet.isSterilized ? "Si" : "No"}
                    />
                  </tbody>
                </table>
              </div>
            </section>

            {/* Nutrition */}
            <section className="rounded-lg border border-gray-300 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Nutricion
                </h2>
              </div>
              <div className="p-5">
                <table className="w-full text-sm">
                  <tbody>
                    <DataRow label="Alimento Principal" value={pet.foodMain} />
                    <DataRow label="Tipo de Dieta" value={pet.dietType} />
                    <DataRow label="Cantidad Diaria" value={pet.dailyAmount} />
                  </tbody>
                </table>
              </div>
            </section>

            {/* Behavior */}
            <section className="rounded-lg border border-gray-300 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Comportamiento
                </h2>
              </div>
              <div className="p-5">
                <table className="w-full text-sm">
                  <tbody>
                    <DataRow label="Nivel de Actividad" value={pet.activityLevel} />
                    <DataRow
                      label="Convive con mascotas"
                      value={pet.coexistsWithOtherPets ? "Si" : "No"}
                    />
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column - Medical */}
          <div className="space-y-5">
            {/* Health Status */}
            <section className="rounded-lg border border-gray-300 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Estado Clinico
                </h2>
              </div>
              <div className="p-5">
                <table className="w-full text-sm">
                  <tbody>
                    <DataRow
                      label="Estado General"
                      value={pet.healthStatus}
                      badge={pet.healthStatus === "Saludable" ? "green" : "amber"}
                    />
                    <DataRow
                      label="Alergias"
                      value={pet.allergies}
                      badge={pet.allergies !== "Ninguna conocida" ? "red" : undefined}
                    />
                    <DataRow label="Medicamentos" value={pet.medications} />
                  </tbody>
                </table>
                {pet.diseases.length > 0 && (
                  <div className="mt-3 border-t border-gray-200 pt-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Enfermedades Diagnosticadas
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {pet.diseases.map((d) => (
                        <Badge key={d} className="bg-red-100 text-red-800 text-xs border border-red-300 font-medium">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Vaccine History */}
            <section className="rounded-lg border border-gray-300 bg-white">
              <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <Syringe className="h-4 w-4" />
                    Historial de Vacunacion
                  </h2>
                  {expiredVaccines.length > 0 && (
                    <Badge className="bg-red-600 text-white text-[10px] border-0 font-bold">
                      {expiredVaccines.length} VENCIDA{expiredVaccines.length > 1 ? "S" : ""}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="px-5 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Vacuna
                      </th>
                      <th className="px-5 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-5 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Vet ID
                      </th>
                      <th className="px-5 py-2.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pet.vaccines.map((v, i) => (
                      <tr
                        key={`${v.name}-${i}`}
                        className={`border-b border-gray-100 last:border-b-0 ${
                          v.status === "Vencida" ? "bg-red-50/40" : ""
                        }`}
                      >
                        <td className="px-5 py-3 font-medium text-gray-900">{v.name}</td>
                        <td className="px-5 py-3 text-gray-600 font-mono text-xs">{v.date}</td>
                        <td className="px-5 py-3 font-mono text-xs text-gray-500">{v.vetId}</td>
                        <td className="px-5 py-3">
                          <Badge
                            className={`text-[10px] font-bold border-0 ${
                              v.status === "Vigente"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-600 text-white"
                            }`}
                          >
                            {v.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

function DataRow({
  label,
  value,
  mono = false,
  badge,
}: {
  label: string
  value: string
  mono?: boolean
  badge?: "green" | "amber" | "red" | "blue"
}) {
  const badgeColors: Record<string, string> = {
    green: "bg-green-100 text-green-800 border-green-300",
    amber: "bg-amber-100 text-amber-800 border-amber-300",
    red: "bg-red-100 text-red-800 border-red-300",
    blue: "bg-blue-100 text-blue-800 border-blue-300",
  }

  return (
    <tr className="border-b border-gray-100 last:border-b-0">
      <td className="py-2 pr-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-40 align-top">
        {label}
      </td>
      <td className={`py-2 text-gray-900 ${mono ? "font-mono text-xs" : ""}`}>
        {badge ? (
          <Badge className={`text-xs border font-medium ${badgeColors[badge]}`}>
            {value}
          </Badge>
        ) : (
          value
        )}
      </td>
    </tr>
  )
}
