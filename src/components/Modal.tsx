'use client'

import React, { useEffect, useRef } from 'react'

type ModalProps = {
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode
}
export const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (isOpen) closeModal()
      }
    }

    window.addEventListener('mousedown', handleOutsideClick)

    return () => window.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen, closeModal])

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center top-[10vh] z-50">
      <div className="border p-6 rounded w-full h-[80vh] overflow-scroll bg-black" ref={modalRef}>
        {children}
      </div>
    </div>
  ) : null
}
