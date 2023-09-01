import React from 'react'
import { AuthButtonServer } from './auth-button-server'

const LoginCard = () => {
  return (
    <section className='bg-gray-950'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-xl xl:p-0 bg-gray-900 border-gray-800'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white'>
              Log in to Lilnait.dev
            </h1>
            <p className='text-sm font-light text-gray-400 '>
              Don’t have an account?{' '}
              <a
                href='#'
                className='font-medium text-purple-500 hover:underline'
              >
                Sign up
              </a>
            </p>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-white'
                  >
                    Email
                  </label>
                  <input
                    className='border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-500 text-white'
                    placeholder='name@company.com'
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-500 text-white'
                    required={true}
                  />
                </div>
              </div>

              <div className='flex justify-center items-center'>
                <div className='h-0.5 w-full bg-gray-600' />
                <span className='px-5 text-white'>or</span>
                <div className='h-0.5 w-full bg-gray-600' />
              </div>

              <AuthButtonServer />

              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4'
                      required={true}
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-300'>
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href='#'
                  className='text-sm font-medium text-purple-500 hover:underline'
                >
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-purple-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginCard
