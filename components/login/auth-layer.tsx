const AuthLayer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='bg-background'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-xl xl:p-0 bg-background border-border'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>{children}</div>
        </div>
      </div>
    </section>
  )
}

export default AuthLayer
