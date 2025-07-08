"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { AppConfig, UserSession, showConnect } from "@stacks/connect"
import { getAppDetails } from "../lib/stacks-config"

interface WalletContextType {
  isConnected: boolean
  userAddress: string
  isLoading: boolean
  connectWallet: () => void
  disconnectWallet: () => void
  clearSession: () => void
  userSession: UserSession
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const appConfig = new AppConfig(["store_write", "publish_data"])
const userSession = new UserSession({ appConfig })

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Clear corrupted session data
  const clearSession = () => {
    try {
      console.log("Clearing session data...")
      userSession.signUserOut()
      localStorage.removeItem("blockstack-session")
      localStorage.removeItem("stacks-session")
      localStorage.removeItem("connect-session")
      setIsConnected(false)
      setUserAddress("")
      console.log("Session cleared successfully")
    } catch (error) {
      console.error("Error clearing session:", error)
    }
  }

  // Safe session check with error handling
  const checkSession = () => {
    try {
      console.log("Checking session state...")

      // Check if user is signed in safely
      if (userSession.isUserSignedIn()) {
        console.log("User is signed in, loading data...")
        const userData = userSession.loadUserData()

        // Validate userData structure
        if (userData && userData.profile && userData.profile.stxAddress) {
          const address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet
          if (address) {
            setIsConnected(true)
            setUserAddress(address)
            console.log("Session restored successfully:", address)
          } else {
            console.warn("No valid address found in session")
            clearSession()
          }
        } else {
          console.warn("Invalid user data structure")
          clearSession()
        }
      } else {
        console.log("User not signed in")
        setIsConnected(false)
        setUserAddress("")
      }
    } catch (error) {
      console.error("Session check error:", error)
      console.log("Clearing corrupted session...")
      clearSession()
    }
  }

  useEffect(() => {
    try {
      // Handle pending sign in
      if (userSession.isSignInPending()) {
        console.log("Handling pending sign in...")
        setIsLoading(true)

        userSession
          .handlePendingSignIn()
          .then((userData) => {
            console.log("Sign in completed:", userData)
            if (userData && userData.profile && userData.profile.stxAddress) {
              const address = userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet
              setIsConnected(true)
              setUserAddress(address)
            }
          })
          .catch((error) => {
            console.error("Error handling pending sign in:", error)
            clearSession()
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        // Check existing session
        checkSession()
      }
    } catch (error) {
      console.error("Wallet provider initialization error:", error)
      clearSession()
    }
  }, [])

  const connectWallet = () => {
    try {
      setIsLoading(true)
      showConnect({
        appDetails: getAppDetails(),
        redirectTo: "/",
        onFinish: () => {
          console.log("Wallet connection finished")
          setIsLoading(false)
          checkSession()
        },
        onCancel: () => {
          console.log("Wallet connection cancelled")
          setIsLoading(false)
        },
        userSession,
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    try {
      console.log("Disconnecting wallet...")
      clearSession()
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        userAddress,
        isLoading,
        connectWallet,
        disconnectWallet,
        clearSession,
        userSession,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
