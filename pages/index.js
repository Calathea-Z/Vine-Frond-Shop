import Header from '@/components/Header';
import Hero from '@/components/Hero';
// import InstagramFeed from '@/components/InstagramFeed'
import Footer from '@/components/Footer';
import HighlightedProductCarousel from '@/components/HighlitedProductCarousel';
import Head from 'next/head';

export default function Home() {

  return (
    <div className='z-0 relative min-h-screen'>
      <Head>
        <title>Vine & Frond</title>
      </Head>
    <Header className="fixed top-0 left-0 w-full z-50"/>
    <Hero  />
    <HighlightedProductCarousel />
    <div className='bg-primary w-full flex justify-center items-center gap-5 font-extrabold text-2xl p-10'>
      <h1 className='p-2 text-sm sm:text-2xl'>@vineandfrond</h1>
      <h1 className='p-2 text-sm sm:text-2xl'>#vineandfrond</h1>
    </div>
    {/* <InstagramFeed /> */}
    <Footer />
    </div>
  )
}
