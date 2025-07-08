"use client"

import { useState, useEffect } from "react"
import { TreePine, Waves, Heart, Calculator, CheckCircle, AlertCircle, Wallet, TrendingUp } from "lucide-react"
import { useWallet } from "./WalletProvider"
import { useAccountBalance } from "../hooks/useHiroApi"
import { calculateImpact, getNetworkInfo } from "../lib/donation-utils"
import { formatSTXAmount } from "../lib/hiro-api"
import { isHiroApiConfigured } from "../lib/stacks-config"

interface DonationImpact {
  trees: number
  plastic: number
  co2: number
  marineLife: number
}

export default function EnhancedDonationForm() {
  const [amount, setAmount] = useState<number>(100)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [isCustom, setIsCustom] = useState<boolean>(false)
  const [impact, setImpact] = useState<DonationImpact>({ trees: 0, plastic: 0, co2: 0, marineLife: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [donationStatus, setDonationStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [isClient, setIsClient] = useState(false)

  const { isConnected, userAddress, connectWallet } = useWallet()
  const { balance, loading: balanceLoading } = useAccountBalance(userAddress)
  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  // Hydration-safe client detection
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const currentAmount = isCustom ? Number.parseFloat(customAmount) || 0 : amount
    setImpact(calculateImpact(currentAmount))
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
    if (!isConnected) {
      setDonationStatus("error")
      setMessage("Please connect your Hiro wallet first.")
      return
    }

    const finalAmount = isCustom ? Number.parseFloat(customAmount) : amount

    // Check if user has sufficient balance
    if (balance && isHiroApiConfigured()) {
      const stxBalance = Number.parseInt(balance.stx?.balance || "0") / 1000000
      if (finalAmount > stxBalance) {
        setDonationStatus("error")
        setMessage(
          `Insufficient balance. You have ${formatSTXAmount(Number.parseInt(balance.stx?.balance || "0"))} STX available.`,
        )
        return
      }
    }

    setIsLoading(true)
    setDonationStatus("idle")

    try {
      // TODO: Implement actual Stacks transaction here
      // For now, simulate the donation process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setDonationStatus("success")
      setMessage(
        `Thank you! Your ${finalAmount} STX donation will plant ${impact.trees} trees and remove ${impact.plastic}kg of ocean plastic. Transaction processing...`,
      )
      setIsLoading(false)
    } catch (error) {
      console.error("Donation error:", error)
      setDonationStatus("error")
      setMessage("Donation failed. Please try again.")
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

  // Get user's STX balance
  const userBalance = balance ? Number.parseInt(balance.stx?.balance || "0") / 1000000 : 0

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

              {/* Wallet Connection Status */}
              {!isConnected && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Wallet className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-yellow-800">Hiro Wallet Required</p>
                      <p className="text-sm text-yellow-700">Connect your Stacks wallet to make a donation</p>
                    </div>
                  </div>
                  <button
                    onClick={connectWallet}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    Connect Hiro Wallet
                  </button>
                </div>
              )}

              {/* Balance Display */}
              {isConnected && isHiroApiConfigured() && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Available Balance</span>
                    </div>
                    <div className="text-right">
                      {balanceLoading ? (
                        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span className="font-bold text-green-800">
                          {formatSTXAmount(Number.parseInt(balance?.stx?.balance || "0"))} STX
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Preset Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount (STX)</label>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((presetAmount) => {
                    const isAffordable = !isConnected || !balance || presetAmount <= userBalance
                    return (
                      <button
                        key={presetAmount}
                        onClick={() => handlePresetClick(presetAmount)}
                        disabled={!isConnected || !isAffordable}
                        className={`p-3 rounded-xl font-semibold transition-all relative ${
                          !isCustom && amount === presetAmount
                            ? "bg-green-600 text-white shadow-md"
                            : isAffordable
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-gray-50 text-gray-400 cursor-not-allowed"
                        } ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {presetAmount}
                        {!isAffordable && isConnected && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        )}
                      </button>
                    )
                  })}
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
                    disabled={!isConnected}
                    className={`w-full p-4 border-2 rounded-xl font-semibold text-lg transition-colors ${
                      isCustom ? "border-green-600 focus:border-green-700" : "border-gray-200 focus:border-gray-300"
                    } focus:outline-none ${!isConnected ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
                    min="1"
                    max={userBalance || 10000}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                    STX
                  </div>
                </div>
                {isCustom && isConnected && balance && Number.parseFloat(customAmount) > userBalance && (
                  <p className="text-sm text-red-600 mt-2">
                    Amount exceeds available balance ({formatSTXAmount(Number.parseInt(balance.stx?.balance || "0"))}{" "}
                    STX)
                  </p>
                )}
              </div>

              {/* Donation Button */}
              <button
                onClick={handleDonate}
                disabled={!isConnected || currentAmount <= 0 || isLoading || (balance && currentAmount > userBalance)}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all transform ${
                  isConnected && currentAmount > 0 && !isLoading && (!balance || currentAmount <= userBalance)
                    ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white hover:scale-105 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {!isConnected ? (
                  "Connect Hiro Wallet to Donate"
                ) : isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Donation...
                  </div>
                ) : balance && currentAmount > userBalance ? (
                  "Insufficient Balance"
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

              {/* Connected Wallet Info */}
              {isConnected && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      <span>
                        Connected: {userAddress.slice(0, 8)}...{userAddress.slice(-4)}
                      </span>
                    </div>
                    <span className="text-xs text-green-600">{getNetworkInfo().name}</span>
                  </div>
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

              {/* API Status Info */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {isHiroApiConfigured() ? "✅ Enhanced Features Active" : "⚠️ Basic Mode"}
                </h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isHiroApiConfigured() ? "bg-green-600" : "bg-yellow-600"}`}
                    ></div>
                    <p>
                      <strong>Real-time balance:</strong> {isHiroApiConfigured() ? "Active" : "Requires API key"}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${isHiroApiConfigured() ? "bg-green-600" : "bg-yellow-600"}`}
                    ></div>
                    <p>
                      <strong>Transaction history:</strong> {isHiroApiConfigured() ? "Available" : "Limited"}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      <strong>Secure donations:</strong> Always protected
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
