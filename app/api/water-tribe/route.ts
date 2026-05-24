import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { firstName, email, instagram, referredBy } = await request.json()

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Webhook not configured" },
        { status: 500 }
      )
    }

    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, instagram, referredBy }),
    })

    if (!upstream.ok) {
      return NextResponse.json(
        { success: false, error: "Upstream error" },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal error" },
      { status: 500 }
    )
  }
}
