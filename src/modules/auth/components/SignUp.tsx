'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'

interface SignupFormProps {
  // Add any additional props for the component here
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

const SignupForm: React.FC<SignupFormProps> = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showNotification, setShowNotification] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    setErrorMessage('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      await validationSchema.validate({ username, password }, { abortEarly: false })

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error)
        setShowNotification(true)
      } else {
        console.log('User created successfully:', data)
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {}

        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })

        setErrors(validationErrors)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          className={`p-3 border rounded focus:outline-none ${
            errors.username ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username}</span>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          className={`p-3 border rounded focus:outline-none ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
      </div>

      <button
        type="submit"
        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none"
      >
        Sign Up
      </button>

      <Notification
        message={errorMessage}
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </form>
  )
}

export default SignupForm
