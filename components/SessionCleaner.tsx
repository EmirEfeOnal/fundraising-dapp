"use client"

import { useState } from "react"
import { Trash2, CheckCircle } from "lucide-react"

export default function SessionCleaner() {
  const [isClearing, setIsClearing] = useState(false)
  const [cleared, setCleared] = useState(false)

  const clearAllSessionData = async () => {
    setIsClearing(true)

    try {
      // Clear localStorage
      const keysToRemove = [
        "blockstack-session",
        "stacks-session",
        "connect-session",
        "stacks-wallet-connect",
        "hiro-wallet-connect",
      ]

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key)
      })

      // Clear sessionStorage
      sessionStorage.clear()

      console.log("All session data cleared")
      setCleared(true)

      // Auto reload after 2 seconds
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Error clearing session data:", error)
    } finally {
      setIsClearing(false)
    }
  }

  if (cleared) {
    return (
      <div className="fixed top-4 right-4 bg-green-100 border border-green-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">Session cleared! Reloading...</span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={clearAllSessionData}
      disabled={isClearing}
      className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg border border-red-200 transition-colors shadow-lg"
    >
      <Trash2 className="w-4 h-4" />
      {isClearing ? "Clearing..." : "Clear Session"}
    </button>
  )
}
