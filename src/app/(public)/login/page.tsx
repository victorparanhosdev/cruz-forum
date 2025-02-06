import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { Input } from '@/components/InputText'
import { Button } from '@/components/Button';
import { Label } from '@/components/Label';


export default function Login() {
  return (
    <main className="bg-stone-950 grid grid-cols-view-login rounded-xl overflow-hidden w-full min-h-view-without-fill">

      <section className='bg-[url(/bg.png)] bg-no-repeat bg-bottom bg-cover' />

      <section className='min-w-[331px] p-6 m-auto flex flex-col items-center'>
        <img alt='' src="/logo-login.png" className='max-w-64 mb-12' />

        <form action="" className='grid gap-4 w-full'>
          <div>
            <Label  >Entrar com e-mail</Label>
            <Input placeholder='victor@email.com' state='default' withIcon={<EnvelopeSimple size={20} />} />
          </div>



          <Button type='button' state='default' size='lg'>Continue com seu e-mail</Button>

          <p className='flex items-center gap-2 before:block before:content-[""] before:w-full before:h-px before:bg-stone-700 after:content-[""] after:block after:w-full after:h-px after:bg-stone-700 w-full font-medium'>ou</p>

          <div className='grid gap-3'>

            <button type='button' className='py-1 px-6 hover:enabled:bg-hover-btn-gray transition flex items-center gap-3 border border-stone-700 rounded-lg'><img alt="google" src="./google.svg" className='object-cover' />Fazer login com o Google</button>
            <button type='button' className='py-1 px-6 hover:enabled:bg-hover-btn-gray transition flex items-center gap-3 border border-stone-700 rounded-lg'><img alt="facebook" src="./facebook.svg" className='object-cover' />Fazer login com o Facebook</button>


          </div>

        </form>



      </section>

    </main>
  );
}
