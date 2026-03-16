import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId, 
      userId
    } = await req.json()

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // TODO: Update user plan in DB here
    // Example: await updateDoc(doc(db, 'users', userId), { plan: planId, planStatus: 'active' })

    return NextResponse.json({ success: true, planId })
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
