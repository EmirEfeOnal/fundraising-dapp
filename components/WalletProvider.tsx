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
  userSession: UserSession
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const appConfig = new AppConfig(["store_write", "publish_data"])
const userSession = new UserSession({ appConfig })

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is already signed in
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setIsConnected(true)
        setUserAddress(userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet)
      })
    } else if (userSession.isUserSignedIn()) {
      setIsConnected(true)
      const userData = userSession.loadUserData()
      setUserAddress(userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet)
    }
  }, [])

  const connectWallet = () => {
    setIsLoading(true)
    showConnect({
      appDetails: getAppDetails(),
      redirectTo: "/",
      onFinish: () => {
        setIsLoading(false)
        setIsConnected(true)
        const userData = userSession.loadUserData()
        setUserAddress(userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet)
      },
      onCancel: () => {
        setIsLoading(false)
      },
      userSession,
    })
  }

  const disconnectWallet = () => {
    userSession.signUserOut()
    setIsConnected(false)
    setUserAddress("")
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        userAddress,
        isLoading,
        connectWallet,
        disconnectWallet,
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
