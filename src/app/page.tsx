import Link from 'next/link'

const Home = () => {
  return (
    <div>
      Home
      <Link href={'/login'}>Login</Link>
    </div>
  )
}

export default Home
