import { useEffect } from 'react'
import useSWR from 'swr'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { isLoggedIn } from '@/utils/isLoggedIn'
import { JwtPayload } from 'jsonwebtoken'

const useLoginStatus = (
  cookie: RequestCookie | undefined
): boolean | JwtPayload | string => {
  const fetcher = async () => {
    return await isLoggedIn(cookie)
  }

  const { data: loggedIn, mutate } = useSWR('loginStatus', fetcher)

  useEffect(() => {
    // Revalidate the login status whenever the cookie changes
    mutate()
  }, [cookie, mutate])

  return loggedIn ?? false
}

export default useLoginStatus
