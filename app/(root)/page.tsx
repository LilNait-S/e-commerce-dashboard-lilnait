import LayoutBar from '@/components/shared/layout-bar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: products } = await supabase
    .from('products')
    .select('*, users(id, name, email, avatar_url)')

  return (
    <LayoutBar>
      <div className='max-w-3xl flex flex-col gap-4'>
        {products?.map((product) => (
          <div key={product.id}>
            <span>{product.title}</span>
            <hr />
            <span>{product.content}</span>
          </div>
        ))}
      </div>
    </LayoutBar>
  )
}
