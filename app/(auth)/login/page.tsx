import AuthLayer from '@/components/login/auth-layer'
import AuthEmail from '@/components/login/sign-in/auth-email'
import { AuthGoogle } from '@/components/login/sign-in/auth-google'
import Link from 'next/link'

const Login = () => {
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

export default Login
