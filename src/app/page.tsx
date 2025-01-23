
import Image from 'next/image'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
export default function Login() {
  return (
    <main className="bg-stone-950 grid grid-cols-view-login rounded-xl overflow-hidden w-full min-h-view-without-fill">

      <section className='bg-[url(/bg.png)] bg-no-repeat bg-bottom bg-cover'/>

      <section className='min-w-[331px] p-6 m-auto flex flex-col items-center'>
        <Image alt='' src="/logo.png" width={400} height={400} priority className='max-w-64 mb-12' />

        <form action="" className='grid gap-4 w-full'>
          <div className='w-full'>
            <label htmlFor="" className='mb-2 text-xs block'>Entrar com seu e-mail:</label>
            <div className='relative'>
              <input type="text" name="" id="" className='bg-stone-950 border border-stone-700 placeholder:text-gray-400 text-white rounded-lg w-full py-2.5 pl-4 pr-8' placeholder='victor@email.com' />
              <EnvelopeSimple size={20} className='absolute right-2 top-3' />
            </div>
          </div>

          <button type='button' className='bg-green-950 hover:enabled:bg-hover-btn-green transition ease-linear w-full p-3 rounded-lg'>Continue com seu e-mail</button>

          <p className='flex items-center gap-2 before:block before:content-[""] before:w-full before:h-px before:bg-stone-700 after:content-[""] after:block after:w-full after:h-px after:bg-stone-700 w-full font-medium'>ou</p>

          <div className='grid gap-3'>

            <button type='button' className='py-1 px-6 hover:enabled:bg-hover-btn-gray transition flex items-center gap-3 border border-stone-700 rounded-lg'><Image alt="google" src="./google.svg" width={48} height={48} className='object-cover' />Fazer login com o Google</button>
            <button type='button' className='py-1 px-6 hover:enabled:bg-hover-btn-gray transition flex items-center gap-3 border border-stone-700 rounded-lg'><Image alt="facebook" src="./facebook.svg" width={48} height={48} className='object-cover' />Fazer login com o Facebook</button>


          </div>

        </form>



      </section>

    </main>
  );
}
