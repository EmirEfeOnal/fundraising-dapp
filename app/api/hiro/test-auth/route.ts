import { NextResponse } from "next/server"
import { getHiroApiHeaders, HIRO_API_URL, isHiroApiConfigured } from "../../../../lib/stacks-config"

export async function GET() {
  try {
    if (!isHiroApiConfigured()) {
      return NextResponse.json({ error: "Hiro API key not configured" }, { status: 400 })
    }

    const headers = getHiroApiHeaders()

    // Test with an endpoint that requires authentication
    // Using the account endpoint which requires a valid API key
    const testAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM" // Known testnet address
    const response = await fetch(`${HIRO_API_URL}/extended/v1/address/${testAddress}/balances`, {
      headers,
    })

    console.log(`Auth test response: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Auth test failed: ${response.status}`, errorText)

      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "Invalid API key - Authentication failed",
            authenticated: false,
          },
          { status: 401 },
        )
      }

      if (response.status === 403) {
        return NextResponse.json(
          {
            error: "API key access denied - Check permissions",
            authenticated: false,
          },
          { status: 403 },
        )
      }

      if (response.status === 429) {
        return NextResponse.json(
          {
            error: "Rate limit exceeded - API key may be invalid",
            authenticated: false,
          },
          { status: 429 },
        )
      }

      return NextResponse.json(
        {
          error: `API error: ${response.status} ${response.statusText}`,
          authenticated: false,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Validate response structure to ensure it's a real API response
    if (!data || typeof data !== "object" || !data.hasOwnProperty("stx")) {
      return NextResponse.json(
        {
          error: "Invalid API response structure",
          authenticated: false,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      message: "API key authenticated successfully",
      authenticated: true,
      testAddress,
      responseValid: true,
    })
  } catch (error) {
    console.error("Auth test error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Authentication test failed",
        authenticated: false,
      },
      { status: 500 },
    )
  }
}
