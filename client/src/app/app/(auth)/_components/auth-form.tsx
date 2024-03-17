'use client'

import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'

export function AuthForm() {

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to login to your account
        </p>
      </div>
  
      <Button className="w-full" onClick={() => signIn('google', { callbackUrl: "/app"})}>
          Login With Google
      </Button>
    </div>
  )
}
