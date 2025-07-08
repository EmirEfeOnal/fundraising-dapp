"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink, Key, Shield } from "lucide-react"
import { isHiroApiConfigured, getNetworkConfig, HIRO_API_KEY } from "../lib/stacks-config"
import { hiroApi } from "../lib/hiro-api"

export default function ApiStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error" | "not-configured">("checking")
  const [error, setError] = useState<string>("")
  const [networkInfo, setNetworkInfo] = useState<any>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const checkApiStatus = async () => {
    setStatus("checking")
    setError("")
    setNetworkInfo(null)
    setIsAuthenticated(false)

    if (!isHiroApiConfigured()) {
      setStatus("not-configured")
      return
    }

    try {
      console.log("Testing API connection with authentication...")
      const result = await hiroApi.testConnection()

      console.log("API test result:", result)

      if (result.success && result.authenticated) {
        setNetworkInfo(result.data)
        setIsAuthenticated(true)
        setStatus("connected")
      } else {
        setError(result.message)
        setIsAuthenticated(false)
        setStatus("error")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "API connection failed"
      setError(errorMessage)
      setIsAuthenticated(false)
      setStatus("error")
    }
  }

  useEffect(() => {
    checkApiStatus()
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "not-configured":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "checking":
        return "🔍 Testing API authentication..."
      case "connected":
        return "✅ API Key Authenticated & Verified"
      case "error":
        return `❌ Authentication Failed: ${error}`
      case "not-configured":
        return "⚠️ Hiro API Key Required"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "checking":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "connected":
        return "bg-green-50 border-green-200 text-green-700"
      case "error":
        return "bg-red-50 border-red-200 text-red-700"
      case "not-configured":
        return "bg-yellow-50 border-yellow-200 text-yellow-700"
    }
  }

  const getApiKeyStatus = () => {
    if (!HIRO_API_KEY) return "❌ Not set"
    if (HIRO_API_KEY.length < 32) return "❌ Too short"
    if (!isAuthenticated && status === "error") return "❌ Invalid/Expired"
    if (isAuthenticated) return "✅ Valid & Authenticated"
    return "⏳ Testing..."
  }

  return (
    <div className={`rounded-lg border transition-all ${getStatusColor()}`}>
      <div className="p-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div className="flex-1">
            <p className="font-medium">{getStatusText()}</p>
            {status === "connected" && networkInfo && (
              <p className="text-sm opacity-75 mt-1">
                🔐 Authenticated • Network: {getNetworkConfig().network} • Block time: ~{networkInfo.target_block_time}s
              </p>
            )}
            {status === "not-configured" && (
              <div className="text-sm opacity-75 mt-1">
                <p>Get a free API key from Hiro Platform to enable advanced features</p>
                <a
                  href="https://platform.hiro.so/api-hub?tab=keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium mt-1"
                >
                  Get API Key <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
            {status === "error" && (
              <div className="text-sm opacity-75 mt-1">
                <p>🚫 Your API key failed authentication - please check if it's valid</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {(status === "error" || status === "not-configured") && (
              <button
                onClick={checkApiStatus}
                className="px-3 py-1 bg-white/70 hover:bg-white/90 rounded text-sm font-medium transition-colors"
              >
                Test Again
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1 bg-white/50 hover:bg-white/70 rounded text-sm font-medium transition-colors"
            >
              {isExpanded ? "Less" : "Details"}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-current/20 p-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Configuration
              </h4>
              <div className="space-y-1 opacity-75">
                <p>Network: {getNetworkConfig().network}</p>
                <p>API URL: {getNetworkConfig().hiroApiUrl}</p>
                <p>Key Status: {getApiKeyStatus()}</p>
                {HIRO_API_KEY && (
                  <p>
                    Key Preview: {HIRO_API_KEY.slice(0, 8)}...{HIRO_API_KEY.slice(-4)}
                  </p>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Authentication Status
              </h4>
              <div className="space-y-1 opacity-75">
                <p>Authenticated: {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
                <p>Last Test: {new Date().toLocaleTimeString()}</p>
                {status === "connected" && <p>Features: ✅ Balance, Transactions, Events</p>}
                {status === "error" && <p>Error: {error}</p>}
              </div>
            </div>
          </div>

          {status === "error" && (
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <h5 className="font-semibold text-red-800 mb-2">🔧 Troubleshooting</h5>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Check if your API key is copied correctly</li>
                <li>• Verify the key hasn't expired</li>
                <li>• Ensure you have the right permissions</li>
                <li>• Try generating a new API key</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
