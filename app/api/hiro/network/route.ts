import { NextResponse } from "next/server"
import { getHiroApiHeaders, HIRO_API_URL, isHiroApiConfigured } from "../../../../lib/stacks-config"

export async function GET() {
  try {
    // Check if API key is configured
    if (!isHiroApiConfigured()) {
      return NextResponse.json({ error: "Hiro API key not configured" }, { status: 400 })
    }

    const headers = getHiroApiHeaders()
    const response = await fetch(`${HIRO_API_URL}/extended/v1/info/network_block_times`, {
      headers,
    })

    if (!response.ok) {
      // Log the actual error for debugging
      const errorText = await response.text()
      console.error(`Hiro API error: ${response.status} ${response.statusText}`, errorText)

      if (response.status === 401) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
      }
      if (response.status === 403) {
        return NextResponse.json({ error: "API key access denied" }, { status: 403 })
      }

      return NextResponse.json(
        { error: `Hiro API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Validate response structure
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid API response" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Network info API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch network info" },
      { status: 500 },
    )
  }
}
