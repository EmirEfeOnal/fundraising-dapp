"use client"

import { useState, useEffect, useCallback } from "react"
import { AppConfig, UserSession } from "@stacks/connect"

const appConfig = new AppConfig(["store_write", "publish_data"])
const userSession = new UserSession({ appConfig })

export interface WalletState {
  isConnected: boolean
  userAddress: string
  isLoading: boolean
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    userAddress: "",
    isLoading: false,
  })

  const checkConnection = useCallback(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData()
      setWalletState({
        isConnected: true,
        userAddress: userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet,
        isLoading: false,
      })
    }
  }, [])

  useEffect(() => {
    checkConnection()

    // Handle pending sign in
    if (userSession.isSignInPending()) {
      setWalletState((prev) => ({ ...prev, isLoading: true }))
      userSession.handlePendingSignIn().then((userData) => {
        setWalletState({
          isConnected: true,
          userAddress: userData.profile.stxAddress.testnet || userData.profile.stxAddress.mainnet,
          isLoading: false,
        })
      })
    }
  }, [checkConnection])

  const getUserData = useCallback(() => {
    if (userSession.isUserSignedIn()) {
      return userSession.loadUserData()
    }
    return null
  }, [])

  return {
    ...walletState,
    userSession,
    getUserData,
    checkConnection,
  }
}
