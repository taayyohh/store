'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { LOGIN_COOKIE_NAME } from '@/constants'
import { CookieValueTypes, getCookie, getCookies } from 'cookies-next'
import { useRouter } from 'next/navigation'
import useLoginStatus from '@/hooks/useLoginStatus'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { TmpCookiesObj } from 'cookies-next/lib/types'
import { log } from 'util'

const extractLoginCookie = (
  cookies: TmpCookiesObj,
  name: string
): RequestCookie | undefined => {
  const loginCookieValue = cookies[name]
  if (loginCookieValue) {
    return {
      name,
      value: loginCookieValue,
    }
  }
  return undefined
}

export default function Menu() {
  const cookies = getCookies()
  const loginCookie = extractLoginCookie(cookies, LOGIN_COOKIE_NAME)
  const loggedIn = useLoginStatus(loginCookie)

  const router = useRouter()

  useEffect(() => {
    // console.log('hi', loginCookie)
  }, [loginCookie, router])
  // const loggedIn = useLoginStatus()
  //
  //   console.log('loggedin', loggedIn, cookies)

  return (
    <menu className="flex gap-3 uppercase text-xs absolute right-0">
      <li>
        <Link href="/login">Login</Link>
      </li>
      {' / '}
      <li>
        <Link href="/signup">Sign Up</Link>
      </li>
    </menu>
  )
}
