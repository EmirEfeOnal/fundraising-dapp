import { getNetworkConfig } from "./stacks-config"

// Donation calculation utilities
export const calculateImpact = (amount: number) => {
  const treesPerSTX = 0.5
  const plasticPerSTX = 0.02
  const co2PerTree = 48
  const marineLifePerKg = 5

  const trees = Math.floor(amount * treesPerSTX)
  const plastic = Number((amount * plasticPerSTX).toFixed(2))
  const co2 = Math.floor(trees * co2PerTree)
  const marineLife = Math.floor(plastic * marineLifePerKg)

  return { trees, plastic, co2, marineLife }
}

// Format STX amount
export const formatSTX = (amount: number): string => {
  return `${amount.toLocaleString()} STX`
}

// Validate donation amount
export const validateDonationAmount = (amount: number): { isValid: boolean; error?: string } => {
  if (amount <= 0) {
    return { isValid: false, error: "Amount must be greater than 0" }
  }
  if (amount > 10000) {
    return { isValid: false, error: "Amount cannot exceed 10,000 STX" }
  }
  return { isValid: true }
}

// Get network info for display
export const getNetworkInfo = () => {
  const config = getNetworkConfig()
  return {
    name: config.network === "testnet" ? "Stacks Testnet" : "Stacks Mainnet",
    explorerUrl:
      config.network === "testnet" ? "https://explorer.stacks.co/?chain=testnet" : "https://explorer.stacks.co/",
  }
}
