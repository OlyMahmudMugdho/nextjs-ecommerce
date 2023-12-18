import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Add Product | Next E-commerce',
  description: 'Add a product to the database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
        {children}
        </main>
      </body>
    </html>
  )
}
