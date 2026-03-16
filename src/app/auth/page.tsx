'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to signin by default if this route is hit
    router.replace('/signin')
  }, [router])

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#6C3CE1] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
