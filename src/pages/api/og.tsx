export const config = {
  runtime: 'edge',
}

import { ImageResponse } from '@vercel/og'

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(173 112 39)',
        }}
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          src={
            'https://nftstorage.link/ipfs/bafybeiaoa4fp54jlppleyg6l5lvpgqub2i3rigps4rbmjavomezq45gnw4/gardensession2.png'
          }
          alt={'LucidHaus Garden Session'}
        />
      </div>
    )
  )
}
