import Header from '@/components/Header'
import Head from 'next/head'

export default function Home() {
  return (
    <div className='h-screen bg-primary z-0 relative'>
      <Head>
        <title>Vine & Frond</title>
      </Head>
    <Header /> 
    </div>
  )
}
