'use client'

import React, { useEffect } from 'react'

interface NotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isVisible, onClose])

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded shadow">
          {message}
        </div>
      )}
    </>
  )
}

export default Notification
