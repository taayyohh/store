'use client'

import Link from 'next/link'

export default function Menu() {
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
