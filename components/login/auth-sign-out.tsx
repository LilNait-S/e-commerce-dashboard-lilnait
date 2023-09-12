'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { SignOut } from '../icons'

export function AuthSignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Button onClick={handleSignOut} variant='ghost' size='icon'>
      <SignOut />
      <span className='sr-only'>Sign out</span>
    </Button>
  )
}
