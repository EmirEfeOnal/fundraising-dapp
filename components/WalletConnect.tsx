"use client"

import { useState } from "react"
import { Wallet, LogOut, User, Copy, Check, AlertTriangle } from "lucide-react"
import { useWallet } from "./WalletProvider"

export default function WalletConnect() {
  const { isConnected, userAddress, isLoading, connectWallet, disconnectWallet, clearSession } = useWallet()
  const [copied, setCopied] = useState(false)
  const [showSessionError, setShowSessionError] = useState(false)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleConnect = () => {
    try {
      connectWallet()
    } catch (error) {
      console.error("Connection error:", error)
      setShowSessionError(true)
    }
  }

  const handleClearSession = () => {
    clearSession()
    setShowSessionError(false)
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        {/* User Info */}
        <div className="hidden sm:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
          <User className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">{formatAddress(userAddress)}</span>
          <button
            onClick={copyAddress}
            className="p-1 hover:bg-green-100 rounded transition-colors"
            title="Copy address"
          >
            {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3 text-green-600" />}
          </button>
        </div>

        {/* Mobile User Info */}
        <div className="sm:hidden flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl border border-green-200">
          <User className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">{formatAddress(userAddress)}</span>
        </div>

        {/* Disconnect Button */}
        <button
          onClick={disconnectWallet}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl border border-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <Wallet className="w-5 h-5" />
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <span>Connect Hiro Wallet</span>
        )}
      </button>

      {/* Session Error Handler */}
      {showSessionError && (
        <button
          onClick={handleClearSession}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl border border-yellow-200 transition-colors"
          title="Clear corrupted session data"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="hidden sm:inline">Fix Session</span>
        </button>
      )}
    </div>
  )
}
