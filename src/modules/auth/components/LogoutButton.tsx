'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LogoutButton = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    })
    const data = await response.json()

    if (!response.ok) {
      setErrorMessage(data.error)
      setShowNotification(true)
    } else {
      router.push('/')
    }
  }

  return <div onClick={handleLogout}>logout</div>
}

export default LogoutButton
