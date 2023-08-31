import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from '@/components/auth-button-server'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: products } = await supabase.from('products').select()
  return (
    <main>
      Dashboard

      <AuthButtonServer />
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  )
}
