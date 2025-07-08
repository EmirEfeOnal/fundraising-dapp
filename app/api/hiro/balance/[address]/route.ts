import { type NextRequest, NextResponse } from "next/server"
import { getHiroApiHeaders, HIRO_API_URL, isHiroApiConfigured } from "../../../../../lib/stacks-config"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    console.log("Balance API route called for address:", params.address)

    if (!isHiroApiConfigured()) {
      console.log("API key not configured")
      return NextResponse.json({ error: "Hiro API key not configured" }, { status: 400 })
    }

    const { address } = params

    // Validate address format (basic Stacks address validation)
    if (!address || (!address.startsWith("ST") && !address.startsWith("SP"))) {
      console.log("Invalid address format:", address)
      return NextResponse.json({ error: "Invalid Stacks address" }, { status: 400 })
    }

    const headers = getHiroApiHeaders()
    console.log("Making request to Hiro API with headers:", Object.keys(headers))

    const apiUrl = `${HIRO_API_URL}/extended/v1/address/${address}/balances`
    console.log("API URL:", apiUrl)

    const response = await fetch(apiUrl, { headers })

    console.log("Hiro API response status:", response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Balance API error: ${response.status} ${response.statusText}`, errorText)

      if (response.status === 401) {
        return NextResponse.json({ error: "Invalid API key - Check your Hiro Platform API key" }, { status: 401 })
      }
      if (response.status === 403) {
        return NextResponse.json({ error: "API key access denied - Check permissions" }, { status: 403 })
      }
      if (response.status === 404) {
        return NextResponse.json({ error: "Address not found or invalid" }, { status: 404 })
      }

      return NextResponse.json(
        { error: `Hiro API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Balance data received:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Balance API route error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch balance" },
      { status: 500 },
    )
  }
}
