import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthEmail from './sign-in/auth-email'

export async function AuthButtonServer() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  // session={session}
  return <AuthEmail session={session} />
}
