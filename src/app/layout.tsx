import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import NextHead from 'next/head'
import config from '@/constants/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LucidHaus Garden Sessions',
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

          <NextHead>
            <meta charSet="UTF-8" />
            <title>{`LucidHaus Garden Session`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
              name="description"
              content={`Lucidhaus is the home of timeless, post genre black music. The Garden Session is a space to be in community with other artists, creatives, and music lovers who want to see the world change for the better`}
            />
            <meta property="og:url" content={'https://garden.lucid.haus'} />
            <meta property="og:title" content={'LucidHaus Garden Session'} />
            <meta
              property="og:description"
              content={`Lucidhaus is the home of timeless, post genre black music. The Garden Session is a space to be in community with other artists, creatives, and music lovers who want to see the world change for the better`}
            />
            <meta name="twitter:creator" content={`@lucidhaus`} />
            <meta name="twitter:site" content={'https://twitter.com/lucidhaus'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:image" content={`https://garden.lucid.haus/api/og`} />
          </NextHead>

          <div className={'pt-8'}>{children}</div>
        </div>
      </body>
    </html>
  )
}
