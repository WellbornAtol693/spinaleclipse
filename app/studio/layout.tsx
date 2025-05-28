// app/studio/layout.tsx

import './globals.css' // or wherever your global styles are

export const metadata = {
  title: 'Studio',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
