import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/InputText";
import { Menu } from "@/components/Menu";
import { Topic } from "@/components/Topic";
import { CaretDoubleLeft, CaretDoubleRight, CaretLineLeft, CaretLineRight, Chats, FadersHorizontal, ListPlus, MagnifyingGlass, StarFour } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
    return (
        <div className="grid grid-cols-view-home min-h-view-without-fill gap-6 w-full">
            <Menu />
            <main className="bg-stone-950 rounded-xl px-4 py-12">
                <h1 className="text-3xl font-bold flex gap-2">Feed <Chats weight="bold" size={36} /></h1>

                <section className="grid gap-4 pt-9">
                    <div className="flex gap-4">
                        <div className="flex gap-3  w-full">
                            <Input state="default" placeholder="Buscar um topico" withIcon={<MagnifyingGlass size={20} />} />
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
                            {Array.from({ length: 6 }).map((_, index) => {
                                return (
                                    <Topic key={index} />
                                )
                            })}
                        </div>

                        <div className="flex gap-2 items-center place-content-end">
                            <CaretDoubleLeft size={24} />
                            <CaretLineLeft size={24} />
                            <CaretLineRight size={24} />
                            <CaretDoubleRight size={24} />
                        </div>


                    </div>

                </section>


            </main>
            <aside className="bg-stone-950 rounded-xl px-4 pt-12">
                <h2 className="text-sm flex gap-1 items-center mb-8"> <StarFour size={16} /> Mais Relevantes</h2>

                <div className="flex flex-col gap-4">
                    {Array.from({ length: 5 }).map((_, index) => {
                        return (
                            <Card key={index} />
                        )
                    })}
                </div>
            </aside>
        </div>
    )
}