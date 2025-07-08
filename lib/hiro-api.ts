import { isHiroApiConfigured } from "./stacks-config"

// Hiro API client that uses Next.js API routes as proxy
class HiroApiClient {
  private baseUrl: string

  constructor() {
    // Use Next.js API routes instead of direct Hiro API calls
    this.baseUrl = "/api/hiro"
  }

  // Generic API call method with better error handling
  private async apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (!isHiroApiConfigured()) {
      throw new Error("Hiro API key not configured or invalid")
    }

    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Handle specific error cases
      if (response.status === 401) {
        throw new Error("Invalid API key - Authentication failed")
      }
      if (response.status === 403) {
        throw new Error("API key access denied - Check your API key permissions")
      }
      if (response.status === 429) {
        throw new Error("Rate limit exceeded - Your API key may be invalid")
      }
      if (response.status === 400) {
        throw new Error(errorData.error || "Bad request - Check your configuration")
      }

      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Test API authentication with a real authenticated endpoint
  async testAuthentication() {
    try {
      return await this.apiCall("/test-auth")
    } catch (error) {
      console.error("Error testing authentication:", error)
      throw error
    }
  }

  // Get account balance
  async getAccountBalance(address: string) {
    try {
      return await this.apiCall(`/balance/${address}`)
    } catch (error) {
      console.error("Error fetching account balance:", error)
      throw error
    }
  }

  // Get account transactions
  async getAccountTransactions(address: string, limit = 20) {
    try {
      return await this.apiCall(`/transactions/${address}?limit=${limit}`)
    } catch (error) {
      console.error("Error fetching account transactions:", error)
      throw error
    }
  }

  // Get transaction details
  async getTransaction(txId: string) {
    try {
      return await this.apiCall(`/transaction/${txId}`)
    } catch (error) {
      console.error("Error fetching transaction:", error)
      throw error
    }
  }

  // Get contract events
  async getContractEvents(contractAddress: string, contractName: string, limit = 20) {
    try {
      return await this.apiCall(`/contract/${contractAddress}/${contractName}/events?limit=${limit}`)
    } catch (error) {
      console.error("Error fetching contract events:", error)
      throw error
    }
  }

  // Get network info (public endpoint - doesn't require auth)
  async getNetworkInfo() {
    try {
      return await this.apiCall("/network")
    } catch (error) {
      console.error("Error fetching network info:", error)
      throw error
    }
  }

  // Test API connection with REAL authentication validation
  async testConnection() {
    try {
      if (!isHiroApiConfigured()) {
        return {
          success: false,
          message: "API key not configured",
          authenticated: false,
        }
      }

      // Test authentication with a real API call that requires auth
      const authResult = await this.testAuthentication()

      if (!authResult.authenticated) {
        return {
          success: false,
          message: authResult.error || "Authentication failed",
          authenticated: false,
        }
      }

      // If auth passed, also get network info for additional validation
      const networkInfo = await this.getNetworkInfo()

      return {
        success: true,
        message: "API key authenticated and verified",
        authenticated: true,
        data: networkInfo,
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Connection failed"

      return {
        success: false,
        message: errorMessage,
        authenticated: false,
      }
    }
  }
}

// Export singleton instance
export const hiroApi = new HiroApiClient()

// Utility functions
export const formatSTXAmount = (microSTX: number): string => {
  return (microSTX / 1000000).toLocaleString()
}

export const formatTransactionStatus = (status: string): string => {
  switch (status) {
    case "success":
      return "✅ Confirmed"
    case "pending":
      return "⏳ Pending"
    case "failed":
      return "❌ Failed"
    default:
      return status
  }
}
