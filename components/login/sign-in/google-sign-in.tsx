'use client'

import {
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { GoogleIcon } from '../../icons'
import { Button } from '@/components/ui/button'
// { session }: { session: Session | null }
export function AuthGoogleButton() {
  const supabase = createClientComponentClient()

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

  return (
    <Button
      type='button'
      onClick={handleSignIn}
      variant='outline'
      className='w-full'
    >
      <GoogleIcon />
      Sign in with Google
    </Button>
  )
}
