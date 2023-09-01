import Link from 'next/link'
import { ModeToggle } from '../themes/theme-switcher'
import AvatarEntity from '../avatar'
import { AuthSignOut } from '../login/auth-button-client-sign-out'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Topbar = async () => {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  return (
    <>
      {session !== null && (
        <nav className='topbar'>
          <Link href='/' className='flex items-center gap-4'>
            <img src='/logo120.png' alt='logo' width={32} height={32} />
            <span className='sr-only'>Home</span>
          </Link>

          <div className='flex gap-3 items-center'>
            <ModeToggle />
            <AvatarEntity avatarUrl={session.user.user_metadata.avatar_url} />
            <span className='text-xs'>{session.user.email}</span>
            <AuthSignOut />
          </div>
        </nav>
      )}
    </>
  )
}

export default Topbar
