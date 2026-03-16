import Razorpay from 'razorpay'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { planId, userId } = await req.json()

    // Instantiate inside the route to ensure env vars are loaded correctly
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const amounts: Record<string, number> = {
      pro_monthly: 5900,
      pro_annual: 49900,
      premium_annual: 99900
    }

    if (!amounts[planId]) {
      throw new Error(`Invalid planId: ${planId}`)
    }

    const order = await razorpay.orders.create({
      amount: amounts[planId],
      currency: 'INR',
      receipt: `rcpt_${userId}_${Date.now()}`,
      notes: { planId, userId }
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    })
  } catch (error: any) {
    console.error('RAZORPAY_ERROR:', error)
    // Return more specific error if available
    const errorMessage = error.error?.description || error.message || 'Failed to create order'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
