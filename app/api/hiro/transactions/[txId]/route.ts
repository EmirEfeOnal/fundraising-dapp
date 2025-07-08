import { type NextRequest, NextResponse } from "next/server"
import { getHiroApiHeaders, HIRO_API_URL } from "../../../../../lib/stacks-config"

export async function GET(request: NextRequest, { params }: { params: { txId: string } }) {
  try {
    const { txId } = params
    const headers = getHiroApiHeaders()

    const response = await fetch(`${HIRO_API_URL}/extended/v1/tx/${txId}`, {
      headers,
    })

    if (!response.ok) {
      throw new Error(`Hiro API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Transaction API error:", error)
    return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 })
  }
}
