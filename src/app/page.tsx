
import Image from 'next/image'
import {EnvelopeSimple} from '@phosphor-icons/react/dist/ssr'
export default function Login() {
  return (
    <div className="bg-black p-6 min-h-screen text-white grid">
      <main className="bg-stone-950 grid grid-cols-2 rounded-xl overflow-hidden max-w-[1440px] m-auto">

        <Image alt='' src="/bg.png" width={400} height={400} priority className='w-full h-full'/>

        
        <div className='flex'>

        <form action="" className='min-w-[331px] m-auto flex flex-col items-center' >
        <Image alt='' src="/logo.png" width={400} height={400} priority className='max-w-64 mb-12'/>

        <div className='mb-4 w-full'>
        <label htmlFor="" className='mb-2 text-xs'>Entrar com seu e-mail:</label>
        <div className='relative'>
          <input type="text" name="" id="" className='bg-stone-950 border border-stone-700 placeholder:text-gray-400 text-white rounded-lg w-full py-2.5 pl-4 pr-8' placeholder='victor@email.com'/>
          <EnvelopeSimple size={20} className='absolute right-2 top-3'/>
        </div>
        </div>

        <button type='button' className='bg-green-950 hover:enabled:bg-hover-btn-green transition ease-linear w-full p-3 rounded-lg'>Continue com seu e-mail</button>

        </form>



        </div>

      </main>
    </div>
  );
}
