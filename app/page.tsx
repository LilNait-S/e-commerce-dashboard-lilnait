import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from '@/components/auth-button-server'
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
    <main>
      <AuthButtonServer />
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  )
}
