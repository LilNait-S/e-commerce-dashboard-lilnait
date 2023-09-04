import AuthLayer from '@/components/login/auth-layer'
import EmailIdentify from '@/components/login/identify/email'

const Page = () => {
  return (
    <AuthLayer>
      <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-foreground'>
        Recover your account
      </h1>
      <p className='text-sm font-light text-secondary-foreground'>
        Enter your email address
      </p>
      <EmailIdentify />
    </AuthLayer>
  )
}

export default Page
