'use client'

import {
  type Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { GoogleIcon} from './icons'
import { useRouter } from 'next/navigation'

export function AuthButton({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className='flex justify-center'>
      {session === null ? (
        <button
          type='button'
          onClick={handleSignIn}
          className='text-zinc-300 border border-zinc-500 hover:bg-zinc-700 hover:text-white w-full focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center mr-2 mb-2'
        >
          <GoogleIcon />
          Sign in with Google
        </button>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
    </header>
  )
}
