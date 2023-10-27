import Image from 'next/image'
import Head from 'next/head'

export default function Home() {
  return (
    <main className="min-h-screen mt-16">
      <Head>
          <title>Início - Labic</title>
      </Head>
      <div className='flex items-center justify-between px-4 gap-8 flex-col-reverse sm:flex-row sm:mx-24 py-8'>
        <div className='flex flex-col items-center md:mb-[-1rem] md:items-start gap-4 md:gap-6'>
          <div>
            <h1 className='text-white text-3xl font-bold'>Conheça os Trabalhos do Laboratório Mais Criativo de Sergipe</h1>
            <p className='text-white'>Fazendo história no mundo da tecnologia e robótica!</p>
          </div>
          <button className='text-white font-bold max-w-[14rem] rounded-md py-3 px-8 bg-blue-500 active:bg-blue-800 hover:bg-blue-700 ease-in-out duration-300'>Quero Conhecer!</button>
        </div>
        <Image className='sm:w-5/12' priority src="/hero_image.png" width={1080} height={861} alt='Hero Image'></Image>
      </div>
    </main>
  )
}
