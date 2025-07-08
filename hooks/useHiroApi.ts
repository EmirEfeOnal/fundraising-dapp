"use client"

import { useState, useEffect } from "react"
import { hiroApi } from "../lib/hiro-api"
import { isHiroApiConfigured } from "../lib/stacks-config"

// Hook for account balance
export function useAccountBalance(address: string) {
  const [balance, setBalance] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("useAccountBalance effect triggered:", {
      address,
      isHiroApiConfigured: isHiroApiConfigured(),
    })

    if (!address || !isHiroApiConfigured()) {
      console.log("Skipping balance fetch - no address or API not configured")
      return
    }

    const fetchBalance = async () => {
      console.log("Starting balance fetch for address:", address)
      setLoading(true)
      setError(null)
      setBalance(null)

      try {
        console.log("Calling hiroApi.getAccountBalance...")
        const balanceData = await hiroApi.getAccountBalance(address)
        console.log("Balance data received:", balanceData)
        setBalance(balanceData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch balance"
        console.error("Balance fetch error:", err)
        setError(errorMessage)
      } finally {
        setLoading(false)
        console.log("Balance fetch completed")
      }
    }

    fetchBalance()
  }, [address])

  return { balance, loading, error }
}

// Hook for account transactions
export function useAccountTransactions(address: string, limit = 20) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address || !isHiroApiConfigured()) return

    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)
      try {
        const txData = await hiroApi.getAccountTransactions(address, limit)
        setTransactions(txData.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch transactions")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [address, limit])

  return { transactions, loading, error }
}

// Hook for transaction details
export function useTransaction(txId: string) {
  const [transaction, setTransaction] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!txId || !isHiroApiConfigured()) return

    const fetchTransaction = async () => {
      setLoading(true)
      setError(null)
      try {
        const txData = await hiroApi.getTransaction(txId)
        setTransaction(txData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch transaction")
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [txId])

  return { transaction, loading, error }
}

// Hook for contract events
export function useContractEvents(contractAddress: string, contractName: string, limit = 20) {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!contractAddress || !contractName || !isHiroApiConfigured()) return

    const fetchEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        const eventsData = await hiroApi.getContractEvents(contractAddress, contractName, limit)
        setEvents(eventsData.results || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch contract events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [contractAddress, contractName, limit])

  return { events, loading, error }
}
