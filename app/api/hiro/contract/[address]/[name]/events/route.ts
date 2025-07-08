import { type NextRequest, NextResponse } from "next/server"
import { getHiroApiHeaders, HIRO_API_URL } from "../../../../../../lib/stacks-config"

export async function GET(request: NextRequest, { params }: { params: Promise<{ address: string; name: string }> }) {
  try {
    const { address, name } = await params
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "20"

    const headers = getHiroApiHeaders()

    const response = await fetch(`${HIRO_API_URL}/extended/v1/contract/${address}.${name}/events?limit=${limit}`, {
      headers,
    })

    if (!response.ok) {
      throw new Error(`Hiro API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Contract events API error:", error)
    return NextResponse.json({ error: "Failed to fetch contract events" }, { status: 500 })
  }
}
