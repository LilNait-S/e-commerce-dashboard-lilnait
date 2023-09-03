import AuthLayer from '@/components/login/auth-layer'
import EmailAuth from '@/components/login/sign-up/email-auth'
import Link from 'next/link'

const SignUp = () => {
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

export default SignUp
