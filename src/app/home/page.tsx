import { Button } from "@/components/Button";
import { Input } from "@/components/InputText";
import { Topic } from "@/components/Topic";
import { BookmarkSimple, CaretDoubleLeft, CaretDoubleRight, CaretDown, CaretLineLeft, CaretLineRight, Chats, FadersHorizontal, ListDashes, ListPlus, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
    return (
        <div className="grid grid-cols-view-home min-h-view-without-fill gap-6 w-full">
            <nav className="bg-stone-950 rounded-xl px-4 pt-12 flex flex-col gap-6">
                <img src="./logo-home.svg" alt="" className="max-w-[166px]"/>
                <button className="flex gap-2 border border-green-200 rounded-xl items-center py-1 px-3">
                    <img src="https://github.com/victorparanhosdev.png" alt="" className="object-cover h-9 w-9 rounded-full"/>
                    <div className="flex flex-col max-w-[110px]">
                        <p className="text-sm font-bold truncate">Victor Paranhos</p>
                        <span className="text-xs  truncate">victorparanhos@email.com</span>
                    </div>
                    <CaretDown size={16}/>
                </button>

                <menu>
                    <ul className="grid gap-3">
                        <li><Button className="w-full justify-start" size="sm" state="transparent" isActive iconLeft={Chats}>Feed</Button></li>
                        <li><Button className="w-full justify-start" size="sm" state="transparent" iconLeft={ListDashes}>Meus Topicos</Button></li>
                        <li><Button className="w-full justify-start" size="sm" state="transparent" iconLeft={BookmarkSimple}>Salvos</Button></li>
                    </ul>
                </menu>

                <div className="w-full h-px bg-gray-900"></div>

            </nav>
            <main className="bg-stone-950 rounded-xl px-4 py-12">
                <h1 className="text-3xl font-bold flex gap-2">Feed <Chats weight="bold" size={36}/></h1>

                <section className="grid gap-4 pt-9">
                    <div className="flex gap-4">
                        <div className="flex gap-3  w-full">
                        <Input state="default" placeholder="Buscar um topico" withIcon={<MagnifyingGlass size={20}/>}/>
                        <Button>Buscar</Button>
                        </div>
                        <Button iconLeft={ListPlus}>Criar tópico</Button>
                    </div>

                    <div className="flex justify-between items-center">
                        <Button className="px-0" state="text" size="sm" iconRight={FadersHorizontal}>Ordernar</Button>
                        <p className="font-medium text-sm">Pagina de 1 a 6</p>
                    </div>


                    <div className="grid gap-4">

                        <div className="grid gap-x-6 gap-y-4 grid-cols-2">
                            {Array.from({length: 6}).map((_, index) => {
                                return (
                                    <Topic key={index}/>
                                )
                            })}
                        </div>

                        <div className="flex gap-2 items-center place-content-end">
                        <CaretDoubleLeft size={24}/>
                        <CaretLineLeft size={24}/>
                        <CaretLineRight size={24}/>
                        <CaretDoubleRight size={24}/>
                        </div>


                    </div>

                </section>


            </main>
            <aside className="bg-stone-950 rounded-xl"></aside>
        </div>
    )
}