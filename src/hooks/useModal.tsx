import React, {useState} from 'react'

// Modal hook
export const useModal = (): {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
} => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = (): void => setIsOpen(true)
  const closeModal = (): void => setIsOpen(false)

  return { isOpen, openModal, closeModal }
}

