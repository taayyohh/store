import LoginForm from '@/modules/auth/components/Login'
import { cookies } from 'next/headers'
import { isLoggedIn } from '@/utils/isLoggedIn'
import { LOGIN_COOKIE_NAME } from '@/constants'
import LogoutButton from '@/modules/auth/components/LogoutButton'

export default async function Page() {
  const cookieStore = cookies()
  const login = cookieStore.get(LOGIN_COOKIE_NAME)
  const hasAccess = login ? await isLoggedIn(login) : false

  return (
    <>
      {hasAccess ? (
        <div>
          <div>Your logged in</div>
          <LogoutButton />
        </div>
      ) : (
        <LoginForm hasAccess={hasAccess} />
      )}
    </>
  )
}
