"use client"

import { PawPrint, ShoppingCart, Phone, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type View } from "@/lib/pet-data"

interface LandingPageProps {
  onNavigate: (view: View) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hotel-lobby.jpg')" }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 lg:px-12">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-widest text-white lg:text-2xl font-serif">
              RADISSON
            </span>
            <span className="sr-only">Cartagena Ocean Pavilion</span>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {["ROOMS", "OFFERS & PACKAGES", "DINING", "GALLERY", "EXPLORE", "ABOUT US"].map(
              (item) => (
                <button
                  key={item}
                  className="text-xs font-medium tracking-wider text-white/90 transition-colors hover:text-white"
                >
                  {item}
                </button>
              )
            )}
            <a
              href="tel:+576056930505"
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              57(605)6930505
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => onNavigate("staff-search")}
              className="text-white/80 hover:text-white hover:bg-white/10 gap-2 rounded-full px-5 text-sm font-medium"
            >
              <Search className="h-4 w-4" />
              Portal Staff
            </Button>
            <Button
              onClick={() => onNavigate("dashboard")}
              className="bg-hotel-accent text-white hover:bg-hotel-accent/90 gap-2 rounded-full px-5 font-semibold text-sm shadow-lg transition-transform hover:scale-105"
            >
              <PawPrint className="h-4 w-4" />
              Sign in your pet
            </Button>
            <button className="hidden rounded-full border border-white/40 px-5 py-2 text-xs font-semibold tracking-wider text-white transition-colors hover:bg-white/10 lg:block">
              BOOK NOW
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-sm font-medium tracking-[0.3em] text-white/70 uppercase">
            Cartagena Ocean Pavilion
          </p>
          <h1 className="max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl font-serif text-balance">
            RADISSON CARTAGENA OCEAN PAVILION HOTEL
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/70 leading-relaxed">
            Experience luxury with your furry companion. Our pet-friendly hotel welcomes you and your pets to paradise.
          </p>
        </div>

        {/* Bottom Dots / Pagination */}
        <div className="flex items-center justify-center gap-2.5 pb-10">
          <span className="h-2.5 w-2.5 rounded-full bg-white" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        </div>

        {/* WhatsApp Float Button */}
        <button
          className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-transform hover:scale-110"
          aria-label="Contact via WhatsApp"
        >
          <Phone className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
