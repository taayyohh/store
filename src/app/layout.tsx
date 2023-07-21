import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'LucidHaus is the home of timeless, post-genre black music.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={'relative mx-auto w-11/12'}>
          <div className={'flex items-center justify-center h-24 w-full'}>
            <Link href={'/'}>
              <Image src={'/header-logo.png'} alt={'Logo'} width="100" height="50" />
            </Link>
          </div>
          <div className={'pt-8'}>{children}</div>
        </div>
      </body>
    </html>
  )
}
