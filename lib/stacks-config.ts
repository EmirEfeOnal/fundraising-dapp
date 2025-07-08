// Stacks network configuration
export const STACKS_NETWORK = process.env.NEXT_PUBLIC_STACKS_NETWORK || "testnet"
export const STACKS_API_URL = process.env.NEXT_PUBLIC_STACKS_API_URL || "https://stacks-node-api.testnet.stacks.co"

// Hiro Platform API Configuration
export const HIRO_API_KEY = process.env.NEXT_PUBLIC_PLATFORM_HIRO_API_KEY || ""
export const HIRO_API_URL = process.env.NEXT_PUBLIC_HIRO_API_URL || "https://api.hiro.so"

// Smart Contract Configuration
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
export const CONTRACT_NAME = process.env.NEXT_PUBLIC_CONTRACT_NAME || "green-earth-fundraising"

// App Configuration
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Green Earth Initiative"
export const APP_ICON = process.env.NEXT_PUBLIC_APP_ICON || "/favicon.ico"

// Environment
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT || "development"

// Network configuration object
export const getNetworkConfig = () => {
  return {
    network: STACKS_NETWORK,
    apiUrl: STACKS_API_URL,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    hiroApiKey: HIRO_API_KEY,
    hiroApiUrl: HIRO_API_URL,
  }
}

// App details for wallet connection
export const getAppDetails = () => {
  return {
    name: APP_NAME,
    icon: APP_ICON,
  }
}

// Hiro API headers
export const getHiroApiHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (HIRO_API_KEY) {
    headers["Authorization"] = `Bearer ${HIRO_API_KEY}`
  }

  return headers
}

// Check if Hiro API key is configured (basic format check only)
export const isHiroApiConfigured = () => {
  return Boolean(HIRO_API_KEY && HIRO_API_KEY.length >= 10)
}

// Validate API key format (basic validation)
export const validateApiKey = (key: string): boolean => {
  // Basic validation - should be at least 32 characters and alphanumeric
  return key.length >= 32 && /^[a-zA-Z0-9]+$/.test(key)
}
