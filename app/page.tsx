"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { Dashboard } from "@/components/dashboard"
import { AddPetForm } from "@/components/add-pet-form"
import { OwnerPetDetail } from "@/components/owner-pet-detail"
import { StaffPetDetail } from "@/components/staff-pet-detail"
import { StaffSearch } from "@/components/staff-search"
import { type View, type Pet } from "@/lib/pet-data"
import { PetProvider } from "@/lib/pet-context"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("landing")
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)

  const handleNavigate = (view: View) => {
    setCurrentView(view)
    window.scrollTo(0, 0)
  }

  const handleSelectPet = (
    pet: Pet,
    target: "owner-pet-detail" | "staff-pet-detail"
  ) => {
    setSelectedPet(pet)
    setCurrentView(target)
    window.scrollTo(0, 0)
  }

  return (
    <PetProvider>
      {currentView === "landing" && <LandingPage onNavigate={handleNavigate} />}
      {currentView === "dashboard" && (
        <Dashboard onNavigate={handleNavigate} onSelectPet={handleSelectPet} />
      )}
      {currentView === "add-pet" && <AddPetForm onNavigate={handleNavigate} />}
      {currentView === "owner-pet-detail" && selectedPet && (
        <OwnerPetDetail pet={selectedPet} onNavigate={handleNavigate} />
      )}
      {currentView === "staff-pet-detail" && selectedPet && (
        <StaffPetDetail pet={selectedPet} onNavigate={handleNavigate} />
      )}
      {currentView === "staff-search" && (
        <StaffSearch onNavigate={handleNavigate} onSelectPet={handleSelectPet} />
      )}
    </PetProvider>
  )
}
