'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export function AuthForm() {

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-5">Please login account below to continue</p>
      </div>
  
      <Button className="w-full" onClick={() => signIn('google', { callbackUrl: "/app"})}>
          Login With Google
      </Button>
    </div>
  )
}
