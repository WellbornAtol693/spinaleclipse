// app/studio/layout.tsx

import '../globals.css' 

export const metadata = {
  title: 'Studio',
  description:'Sanity Content Studio',
  viewport:'width=device-width, initialScale=1',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
