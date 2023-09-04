import AuthLayer from '@/components/login/auth-layer'
import RecoverPassword from '@/components/login/recover/password'

const page = () => {
  return (
    <AuthLayer>
      <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-foreground'>
        Update your password
      </h1>
      <p className='text-sm font-light text-secondary-foreground'>
        Update your email or password
      </p>
      <RecoverPassword />
    </AuthLayer>
  )
}

export default page
