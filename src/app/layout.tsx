import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import config from '@/constants/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  openGraph: {
    title: 'LucidHaus Garden Sessions',
    description:
      'Lucidhaus is the home of timeless, post genre black music. The Garden Session is a space to be in community with other artists, creatives, and music lovers who want to see the world change for the better.',
    url: `${config.BASE_URL}`,
    siteName: 'LucidHaus Garden Sessions',
    images: [
      {
        url: `${config.BASE_URL}api/og`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js',
    description:
      'Lucidhaus is the home of timeless, post genre black music. The Garden Session is a space to be in community with other artists, creatives, and music lovers who want to see the world change for the better.',
    creator: '@lucidhaus',
    images: [`${config.BASE_URL}api/og`],
  },
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
