import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase mb-4 border-t pt-2">Admin</div>
      {children}
    </div>
  )
}
