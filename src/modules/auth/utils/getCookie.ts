import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const getCookie = (name: string): RequestCookie => {
  const cookies: RequestCookie[] = document.cookie.split(';').map((cookie) => {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    return {
      name: cookieName,
      value: cookieValue,
    }
  })

  const foundCookie = cookies.find((cookie) => cookie.name === name)
  if (!foundCookie) {
    throw new Error(`Cookie "${name}" not found.`)
  }

  return foundCookie
}
