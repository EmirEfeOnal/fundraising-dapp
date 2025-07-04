"use client"

import { useState, useEffect } from "react"
import { Calculator, TreePine, Waves, Leaf, Fish, Car, Home } from "lucide-react"

export default function ImpactCalculator() {
  const [donationAmount, setDonationAmount] = useState<number>(100)
  const [impact, setImpact] = useState({
    trees: 0,
    co2: 0,
    plastic: 0,
    marineLife: 0,
    carMiles: 0,
    homeEnergy: 0,
  })
  const [isClient, setIsClient] = useState(false)

  // Hydration-safe client detection
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const treesPerSTX = 0.5
    const co2PerTree = 48
    const plasticPerSTX = 0.02
    const marineLifePerKg = 5

    const trees = Math.floor(donationAmount * treesPerSTX)
    const co2Lbs = trees * co2PerTree
    const plastic = donationAmount * plasticPerSTX
    const marineLife = Math.floor(plastic * marineLifePerKg)
    const carMiles = Math.floor(co2Lbs * 0.5)
    const homeEnergy = Math.floor(co2Lbs / 1000)

    setImpact({
      trees,
      co2: co2Lbs,
      plastic: Number(plastic.toFixed(2)),
      marineLife,
      carMiles,
      homeEnergy,
    })
  }, [donationAmount, isClient])

  // Default values for SSR
  const defaultImpact = {
    trees: 50,
    co2: 2400,
    plastic: 2.0,
    marineLife: 10,
    carMiles: 1200,
    homeEnergy: 2,
  }

  const displayImpact = isClient ? impact : defaultImpact

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-md">
              <Calculator className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-700">Impact Calculator</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See Your Environmental Impact</h2>
            <p className="text-xl text-gray-600">Calculate the real-world environmental benefits of your donation</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              {/* Donation Input */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4">Your Donation Amount (STX)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full text-3xl font-bold text-center py-4 px-6 border-2 border-gray-200 rounded-2xl focus:border-green-600 focus:outline-none transition-colors"
                    min="1"
                    max="10000"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                    STX
                  </div>
                </div>
                <div className="flex justify-center mt-4 gap-2 flex-wrap">
                  {[25, 50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className="px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-lg font-semibold transition-colors"
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Impact Results */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <TreePine className="w-8 h-8" />
                    <h3 className="text-lg font-semibold">Trees Planted</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">{displayImpact.trees}</div>
                  <p className="text-green-100 text-sm">Native species in deforested areas</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Leaf className="w-8 h-8" />
                    <h3 className="text-lg font-semibold">CO₂ Absorbed</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">{displayImpact.co2}</div>
                  <p className="text-green-100 text-sm">Pounds annually when mature</p>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Waves className="w-8 h-8" />
                    <h3 className="text-lg font-semibold">Plastic Removed</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">{displayImpact.plastic}kg</div>
                  <p className="text-blue-100 text-sm">From oceans and waterways</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Fish className="w-8 h-8" />
                    <h3 className="text-lg font-semibold">Marine Life</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">{displayImpact.marineLife}</div>
                  <p className="text-blue-100 text-sm">Animals protected from plastic</p>
                </div>

                <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Car className="w-8 h-8" />
                    <h3 className="text-lg font-semibold">Car Miles Offset</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">{displayImpact.carMiles}</div>
                  <p className="text-gray-200 text-sm">Equivalent CO₂ reduction</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Home className="w-8 h-8" />
                    <h3 className="text-lg font-semibold">Home Energy</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">{displayImpact.homeEnergy}</div>
                  <p className="text-orange-100 text-sm">Days of average home power</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 text-center">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                  Donate {donationAmount} STX & Make This Impact
                </button>
                <p className="text-gray-600 text-sm mt-4">Your donation will be split 60% trees, 40% ocean cleanup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
