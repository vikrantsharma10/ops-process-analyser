import './globals.css'

export const metadata = {
  title: 'Ops Process Analyser — Process Intelligence Suite',
  description: 'At Umbrella, things are done differently.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ backgroundColor: '#0f0f0f', margin: 0, padding: 0 }}>
      <body style={{ backgroundColor: '#0f0f0f', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
