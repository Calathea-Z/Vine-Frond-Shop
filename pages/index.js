import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductCarousel from '@/components/ProductCarousel'
import Head from 'next/head'

export default function Home() {
  return (
    <div className='h-screen z-0 relative'>
      <Head>
        <title>Vine & Frond</title>
      </Head>
    <Header />
    <Hero />
    <ProductCarousel />
    </div>
  )
}
