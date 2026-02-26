"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Pet, petDatabase } from "@/lib/pet-data"

interface PetContextValue {
  pets: Pet[]
  addPet: (pet: Pet) => void
}

const PetContext = createContext<PetContextValue | null>(null)

export function PetProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(petDatabase)

  const addPet = (pet: Pet) => {
    setPets((prev) => [pet, ...prev])
  }

  return (
    <PetContext.Provider value={{ pets, addPet }}>
      {children}
    </PetContext.Provider>
  )
}

export function usePetContext() {
  const ctx = useContext(PetContext)
  if (!ctx) {
    throw new Error("usePetContext must be used within a PetProvider")
  }
  return ctx
}
