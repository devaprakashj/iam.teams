'use client'
import { useState } from 'react'

interface Props {
  planId: string
  label: string
  amount: number
  userId: string
  email: string
  name: string
  onSuccess: () => void
}

export default function PaymentButton({
  planId, label, amount, userId, email, name, onSuccess
}: Props) {
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    try {
      setLoading(true)

      // Load Razorpay script
      await new Promise((res, rej) => {
        if ((window as any).Razorpay) {
          res(true);
          return;
        }
        const s = document.createElement('script')
        s.src = 'https://checkout.razorpay.com/v1/checkout.js'
        s.onload = () => res(true)
        s.onerror = () => rej(new Error('Failed to load Razorpay SDK'))
        document.body.appendChild(s)
      })

      // Create order
      const r = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, userId })
      })
      
      if (!r.ok) {
        const error = await r.json();
        throw new Error(error.error || 'Failed to create order');
      }
      
      const order = await r.json()

      // Open checkout
      const rzp = new (window as any).Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: 'INR',
        name: 'iamfolio',
        description: label,
        order_id: order.orderId,
        prefill: { name, email },
        theme: { color: '#6C3CE1' },

        handler: async (response: any) => {
          try {
            const v = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                planId,
                userId
              })
            })
            const result = await v.json()
            if (result.success) {
              onSuccess()
            } else {
              alert('Payment verification failed: ' + result.error)
            }
          } catch (err: any) {
            console.error('Verification error:', err)
            alert('An error occurred during payment verification.')
          }
        },

        modal: { 
          ondismiss: () => setLoading(false) 
        }
      })

      rzp.open()
    } catch (err: any) {
      console.error('Payment error:', err)
      alert(err.message || 'An error occurred during payment.')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={pay}
      disabled={loading}
      className="w-full py-4 bg-[#6C3CE1] text-white 
                 font-black rounded-2xl font-mono text-[10px] uppercase tracking-widest
                 hover:opacity-90 disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-[#6C3CE1]/20"
    >
      {loading ? 'PROCESSING...' : label}
    </button>
  )
}
