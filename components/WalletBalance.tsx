"use client"

import { useState } from "react"
import { Wallet, RefreshCw, Eye, EyeOff, AlertCircle } from "lucide-react"
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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">STX Balance</span>
            <span className="font-bold text-lg">{showBalance ? `${formattedBalance} STX` : "••••••"}</span>
          </div>

          {balance?.fungible_tokens && Object.keys(balance.fungible_tokens).length > 0 && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Other Tokens</p>
              {Object.entries(balance.fungible_tokens).map(([token, data]: [string, any]) => (
                <div key={token} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{token.split("::")[1] || token}</span>
                  <span>{showBalance ? data.balance : "••••••"}</span>
                </div>
              ))}
            </div>
          )}

          {/* Debug Info (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-2 bg-gray-50 rounded text-xs">
              <p>Debug: Balance loaded successfully</p>
              <p>STX: {balance?.stx?.balance || "0"} microSTX</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
