"use client"

import { useWallet } from "./WalletProvider"
import WalletBalance from "./WalletBalance"
import TransactionHistory from "./TransactionHistory"
import { isHiroApiConfigured } from "../lib/stacks-config"

export default function DashboardWithHiro() {
  const { isConnected, userAddress } = useWallet()

  console.log("DashboardWithHiro render:", {
    isConnected,
    userAddress,
    isHiroApiConfigured: isHiroApiConfigured(),
  })

  if (!isConnected) {
    return (
      <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Wallet Dashboard</h2>
            <p className="text-gray-600 mb-8">Connect your Hiro wallet to view your balance and transaction history</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Wallet Dashboard</h2>
            <p className="text-gray-600">Manage your STX and track your environmental contributions</p>
            {!isHiroApiConfigured() && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Hiro API Key Required:</strong> Add your Hiro Platform API key to access advanced features
                </p>
                <a
                  href="https://platform.hiro.so/api-hub?tab=keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Get API Key →
                </a>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <WalletBalance />
            <TransactionHistory />
          </div>

          {/* Debug Panel (development only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold mb-2">Debug Info</h4>
              <div className="text-sm space-y-1">
                <p>Wallet Connected: {isConnected ? "✅" : "❌"}</p>
                <p>User Address: {userAddress || "None"}</p>
                <p>API Configured: {isHiroApiConfigured() ? "✅" : "❌"}</p>
                <p>Environment: {process.env.NODE_ENV}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
