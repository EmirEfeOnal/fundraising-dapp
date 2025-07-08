"use client"

import React from "react"
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react"

interface SessionErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface SessionErrorBoundaryProps {
  children: React.ReactNode
}

export class SessionErrorBoundary extends React.Component<SessionErrorBoundaryProps, SessionErrorBoundaryState> {
  constructor(props: SessionErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): SessionErrorBoundaryState {
    // Check if it's a session-related error
    if (error.message.includes("JSON data version") || error.message.includes("SessionData")) {
      return { hasError: true, error }
    }
    // Re-throw non-session errors
    throw error
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Session error caught:", error, errorInfo)
  }

  clearSessionData = () => {
    try {
      // Clear all possible session storage keys
      localStorage.removeItem("blockstack-session")
      localStorage.removeItem("stacks-session")
      localStorage.removeItem("connect-session")
      localStorage.removeItem("stacks-wallet-connect")

      // Clear sessionStorage as well
      sessionStorage.clear()

      console.log("Session data cleared")

      // Reset error state and reload
      this.setState({ hasError: false, error: undefined })
      window.location.reload()
    } catch (error) {
      console.error("Error clearing session:", error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Session Data Error</h3>
                <p className="text-sm text-gray-600">Wallet session data is corrupted</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                This usually happens when the Stacks Connect library is updated. Clearing the session data will fix this
                issue.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.clearSessionData}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Session Data & Reload
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Just Reload Page
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p>Error: {this.state.error?.message}</p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
