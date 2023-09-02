import Link from 'next/link'
import EmailAuth from './email-auth'
import AuthLayer from '../auth-layer'

const SignUpCard = () => {
  return (
    <AuthLayer>
      <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-secondary-foreground'>
        Register to Lilnait.dev
      </h1>

      <p className='text-sm font-light text-secondary-foreground'>
        Do you already have an account?{' '}
        <Link
          href='/login'
          className='font-medium text-primary hover:underline'
        >
          Sign in
        </Link>
      </p>
      <EmailAuth />
    </AuthLayer>
  )
}

export default SignUpCard
