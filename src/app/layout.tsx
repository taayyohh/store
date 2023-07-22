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
            <link
              rel="icon"
              type="image/png"
              sizes="24x24"
              href={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADK0lEQVR4AeyVU5cgUQyEa23btm3btm2Pbdv2vKxt62dNbe6pnbO28dDuTr5UKreBx+FVtvEXbVX4dcm1fR3Af4D/AP8BnkRo+8kAr5Je9Cau+hJPI7T9AAAlexb5KsHDMOJmAJGyg+jVnhjXhzi5hMjeW62I3nkYSn3/9QBKet2fSNhKlBwm/FYSh+YTy8YQ4y0xQHRoQQzqQozqJTUStxErxhFHFmq7FywgB/ZUhXwOgD7I2E2M7EnUq0NMHUh0bUPMH2HH1koKEL1NhV7tiB5ticn9iYn9iNZNBNG2GbF9BuGxlLjmJ7jyo8TzqHdB3qk8bgvRrrmSdGlF9O8kmIUjlbBzKz0bbZW3bEwM6Uo0ru/gBDDYAFs0IvrZd306EDMGWxx7tsAKCFxNVB5708BvJC89oqQAUaeWkjSoS6ydKJBh3S14YwXfMNnkN7Bpg4haNYnmlrRjS33bykC6tTGgpsRAA2pvBfU2mNr23tBuxGUfQbwBcD+EmDuMALRZcANQG7ZOc8EF4AKn7SJSdxLhG6RMndpOBbVnRA+907OdU8KBqyVbpqldg02x/APyxUsAXSRtJxrVV/KmDQnv5USnlqrOApicUqdzK/V589QqRG8yU/a1NnTTO1atSa13ewkALlbDuvLQ5AHySvqutxR4EErMGvqq+kn9iYBV9mE9XdeoITVeAUrKKQNU1QSDaNNU1c4xFQd0FnztWmqZK6J7W3kEkKduB2lUbaf5lru1NWuodlQDNGlAjOltIHpu92U6S2JVqk0Oqm9HecLF6thC77UzZWrW1Ng6pZpYEUvHqOVveODQfBlPFUuqRgKwnmrsBCiJXaV9O8ikgDzioMb1UZ8tsb2nFs0aIqiCAzK6rTFaqASgi7vBxKklktFca3Os8QGcseRsQJJGWe/PeBBHFqh6B75xilbI4d3VHjOh+URj52Jf8SXkt/eNoSDsgRaOsx76yGu5eu+5TFX160gz3qtAtwKJ4LVE4BriTpDWEJ8Vupe5RzLbeCv+56+E2iSRQB6F6QfkqlCgV9DPIrXZuSXT9mKkVFIkVsHDr0Ey6oBRB4w6YMC75wAUihhE0mSTsQAAAABJRU5ErkJggg=='
              }
            />
            <meta property="og:url" content={config.BASE_URL} />
            <meta property="og:title" content={'LucidHaus Garden Session'} />
            <meta
              property="og:description"
              content={`Lucidhaus is the home of timeless, post genre black music. The Garden Session is a space to be in community with other artists, creatives, and music lovers who want to see the world change for the better`}
            />
            <meta name="twitter:creator" content={`@lucidhaus`} />
            <meta name="twitter:site" content={'https://twitter.com/lucidhaus'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:image" content={`${config.BASE_URL}api/og`} />
          </NextHead>

          <div className={'pt-8'}>{children}</div>
        </div>
      </body>
    </html>
  )
}
