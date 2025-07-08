import { type NextRequest, NextResponse } from "next/server"
import { getHiroApiHeaders, HIRO_API_URL } from "../../../../../lib/stacks-config"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    const { address } = params
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "20"

    const headers = getHiroApiHeaders()

    const response = await fetch(`${HIRO_API_URL}/extended/v1/address/${address}/transactions?limit=${limit}`, {
      headers,
    })

    if (!response.ok) {
      throw new Error(`Hiro API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Transactions API error:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
