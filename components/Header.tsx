"use client"

import { useState } from "react"
import { TreePine, Waves, Menu, X } from "lucide-react"
import WalletConnect from "./WalletConnect"
import ApiStatus from "./ApiStatus"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Wallet", href: "#wallet" },
    { name: "Calculator", href: "#calculator" },
    { name: "Campaign", href: "#campaign" },
    { name: "Donate", href: "#donate" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <TreePine className="w-8 h-8 text-green-600" />
                <Waves className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Green Earth</h1>
                <p className="text-xs text-gray-600">Initiative</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Wallet Connect */}
            <div className="hidden md:block">
              <WalletConnect />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <WalletConnect />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* API Status Banner */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <div className="container mx-auto px-4 py-2">
          <ApiStatus />
        </div>
      </div>
    </>
  )
}
