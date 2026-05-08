import type { ReactNode } from 'react'

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}
