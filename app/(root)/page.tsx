import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
   const supabaseServer = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabaseServer.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: products } = await supabaseServer
    .from('products')
    .select('*, users(id, name, email, avatar_url)')

  return (
    <div className='max-w-3xl flex flex-col gap-4'>
      {products?.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <hr />
          <span>{product.description}</span>
        </div>
      ))}
    </div>
  )
}
