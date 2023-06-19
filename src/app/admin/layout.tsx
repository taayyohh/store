import { cookies } from 'next/headers'
import { LOGIN_COOKIE_NAME } from '@/constants'
import isSuperAdmin from '@/utils/isSuperAdmin'
import { redirect } from 'next/navigation'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const login = cookieStore.get(LOGIN_COOKIE_NAME)
  const hasAccess = login ? await isSuperAdmin(login) : false

  if (!hasAccess) redirect('/')

  return <div>{children}</div>
}
