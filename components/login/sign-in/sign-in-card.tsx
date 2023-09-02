import Link from 'next/link'
import AuthLayer from '../auth-layer'
import AuthEmail from './auth-email'
import { AuthGoogle } from './auth-google'

const SignInCard = () => {
  return (
    <AuthLayer>
      <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-foreground'>
        Sign in to Lilnait.dev
      </h1>
      <p className='text-sm font-light text-secondary-foreground'>
        Don’t have an account?{' '}
        <Link
          href='/signup'
          className='font-medium text-primary hover:underline'
        >
          Sign up
        </Link>
      </p>
      <AuthEmail>
        <AuthGoogle />
      </AuthEmail>
    </AuthLayer>
  )
}

export default SignInCard
