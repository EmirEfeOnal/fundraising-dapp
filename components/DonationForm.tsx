"use client"

import { useState, useEffect } from "react"
import { TreePine, Waves, Heart, Calculator, CheckCircle, AlertCircle } from "lucide-react"

interface DonationImpact {
  trees: number
  plastic: number
  co2: number
  marineLife: number
}

export default function DonationForm() {
  const [amount, setAmount] = useState<number>(100)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [isCustom, setIsCustom] = useState<boolean>(false)
  const [impact, setImpact] = useState<DonationImpact>({ trees: 0, plastic: 0, co2: 0, marineLife: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [donationStatus, setDonationStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [isClient, setIsClient] = useState(false)

  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  // Hydration-safe client detection
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const currentAmount = isCustom ? Number.parseFloat(customAmount) || 0 : amount
    const treesPerSTX = 0.5
    const plasticPerSTX = 0.02
    const co2PerTree = 48
    const marineLifePerKg = 5

    const trees = Math.floor(currentAmount * treesPerSTX)
    const plastic = Number((currentAmount * plasticPerSTX).toFixed(2))
    const co2 = Math.floor(trees * co2PerTree)
    const marineLife = Math.floor(plastic * marineLifePerKg)

    setImpact({ trees, plastic, co2, marineLife })
  }, [amount, customAmount, isCustom, isClient])

  const handlePresetClick = (presetAmount: number) => {
    setAmount(presetAmount)
    setIsCustom(false)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setIsCustom(true)
  }

  const handleDonate = async () => {
    setIsLoading(true)
    setDonationStatus("idle")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const finalAmount = isCustom ? Number.parseFloat(customAmount) : amount
      setDonationStatus("success")
      setMessage(
        `Thank you! Your ${finalAmount} STX donation will plant ${impact.trees} trees and remove ${impact.plastic}kg of ocean plastic. Together, we're making a real environmental impact!`,
      )
    } catch (error) {
      setDonationStatus("error")
      setMessage("Donation failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const currentAmount = isCustom ? Number.parseFloat(customAmount) || 0 : amount

  // Default values for SSR
  const defaultImpact = {
    trees: 50,
    plastic: 2.0,
    co2: 2400,
    marineLife: 10,
  }

  const displayImpact = isClient ? impact : defaultImpact

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-md">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-gray-700">Make a Difference</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Support Environmental Restoration</h2>
            <p className="text-xl text-gray-600">Every STX donated creates measurable environmental impact</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Donation Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Impact</h3>

              {/* Preset Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount (STX)</label>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((presetAmount) => (
                    <button
                      key={presetAmount}
                      onClick={() => handlePresetClick(presetAmount)}
                      className={`p-3 rounded-xl font-semibold transition-all ${
                        !isCustom && amount === presetAmount
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {presetAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Or Enter Custom Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount in STX"
                    className={`w-full p-4 border-2 rounded-xl font-semibold text-lg transition-colors ${
                      isCustom ? "border-green-600 focus:border-green-700" : "border-gray-200 focus:border-gray-300"
                    } focus:outline-none`}
                    min="1"
                    max="10000"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                    STX
                  </div>
                </div>
              </div>

              {/* Donation Button */}
              <button
                onClick={handleDonate}
                disabled={currentAmount <= 0 || isLoading}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all transform ${
                  currentAmount > 0 && !isLoading
                    ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white hover:scale-105 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Donation...
                  </div>
                ) : (
                  `Donate ${currentAmount} STX`
                )}
              </button>

              {/* Status Messages */}
              {donationStatus !== "idle" && (
                <div
                  className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
                    donationStatus === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {donationStatus === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <p className={`text-sm ${donationStatus === "success" ? "text-green-700" : "text-red-700"}`}>
                    {message}
                  </p>
                </div>
              )}
            </div>

            {/* Impact Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Your Environmental Impact</h3>
                </div>

                {currentAmount > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <TreePine className="w-6 h-6" />
                        <span className="font-semibold">Trees Planted</span>
                      </div>
                      <div className="text-3xl font-bold">{displayImpact.trees}</div>
                      <p className="text-green-100 text-sm">Native species in deforested areas</p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <Waves className="w-6 h-6" />
                        <span className="font-semibold">Ocean Plastic Removed</span>
                      </div>
                      <div className="text-3xl font-bold">{displayImpact.plastic}kg</div>
                      <p className="text-blue-100 text-sm">From oceans and waterways</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{displayImpact.co2}</div>
                        <div className="text-sm text-green-700">lbs CO₂ absorbed annually</div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{displayImpact.marineLife}</div>
                        <div className="text-sm text-blue-700">marine animals protected</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Enter an amount to see your environmental impact</p>
                  </div>
                )}
              </div>

              {/* Additional Impact Info */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border">
                <h4 className="font-semibold text-gray-900 mb-4">How Your Donation Helps</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      <strong>60% goes to reforestation:</strong> Tree seedlings, planting, and 3-year maintenance
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      <strong>40% goes to ocean cleanup:</strong> Equipment, boats, and plastic processing
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      <strong>Transparent tracking:</strong> Real-time updates on your impact
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
