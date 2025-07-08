"use client"

import { useState } from "react"
import { Wallet, RefreshCw, Eye, EyeOff, AlertCircle, TrendingUp } from "lucide-react"
import { useWallet } from "./WalletProvider"
import { useAccountBalance } from "../hooks/useHiroApi"
import { formatSTXAmount } from "../lib/hiro-api"
import { isHiroApiConfigured } from "../lib/stacks-config"

export default function WalletBalance() {
  const { isConnected, userAddress } = useWallet()
  const { balance, loading, error } = useAccountBalance(userAddress)
  const [showBalance, setShowBalance] = useState(true)

  console.log("WalletBalance Debug:", {
    isConnected,
    userAddress,
    balance,
    loading,
    error,
    isHiroApiConfigured: isHiroApiConfigured(),
  })

  if (!isConnected) {
    console.log("Wallet not connected, not showing balance")
    return null
  }

  const stxBalance = balance?.stx?.balance ? Number.parseInt(balance.stx.balance) : 0
  const formattedBalance = formatSTXAmount(stxBalance)

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Wallet Balance</h3>
            <p className="text-sm text-gray-600">
              {userAddress.slice(0, 8)}...{userAddress.slice(-4)}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={showBalance ? "Hide balance" : "Show balance"}
        >
          {showBalance ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
        </button>
      </div>

      {!isHiroApiConfigured() ? (
        <div className="text-center py-4">
          <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-sm text-yellow-600 font-medium">⚠️ Hiro API key not configured</p>
          <p className="text-xs text-gray-500 mt-1">Add NEXT_PUBLIC_PLATFORM_HIRO_API_KEY to see balance</p>
          <a
            href="https://platform.hiro.so/api-hub?tab=keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-2 inline-block"
          >
            Get API Key →
          </a>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-6">
          <RefreshCw className="w-5 h-5 text-gray-400 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Loading balance...</span>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-red-600 font-medium">❌ Failed to load balance</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-2"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Main STX Balance */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-700">STX Balance</span>
              </div>
              <span className="text-xs text-gray-500">Testnet</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {showBalance ? `${formattedBalance} STX` : "••••••"}
            </div>
            <div className="text-sm text-gray-600">
              ≈ ${showBalance ? ((stxBalance / 1000000) * 0.5).toFixed(2) : "••••"} USD
            </div>
          </div>

          {/* Balance Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600 mb-1">Available</div>
              <div className="font-semibold">
                {showBalance ? formatSTXAmount(Number.parseInt(balance?.stx?.balance || "0")) : "••••••"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-600 mb-1">Locked</div>
              <div className="font-semibold">
                {showBalance ? formatSTXAmount(Number.parseInt(balance?.stx?.locked || "0")) : "••••••"}
              </div>
            </div>
          </div>

          {/* Other Tokens */}
          {balance?.fungible_tokens && Object.keys(balance.fungible_tokens).length > 0 && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Other Tokens</p>
              {Object.entries(balance.fungible_tokens).map(([token, data]: [string, any]) => (
                <div key={token} className="flex items-center justify-between text-sm py-1">
                  <span className="text-gray-600">{token.split("::")[1] || token}</span>
                  <span className="font-medium">{showBalance ? data.balance : "••••••"}</span>
                </div>
              ))}
            </div>
          )}

          {/* Success Indicator */}
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 rounded-lg p-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Balance loaded successfully via Hiro API</span>
          </div>
        </div>
      )}
    </div>
  )
}
