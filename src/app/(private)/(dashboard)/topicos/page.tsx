import { Button, Input, Topic } from "@/components"
import { ArrowLeft, CaretDoubleLeft, CaretDoubleRight, CaretLineLeft, CaretLineRight, FadersHorizontal, ListDashes, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Topicos() {
    return (
        <main className="bg-stone-950 rounded-xl px-4 py-12">
            <h1 className="text-3xl font-bold flex gap-2">Meus Topicos<ListDashes weight="bold" size={36} /></h1>
            <section className="grid gap-4 pt-9">
                <div className="flex gap-3">
                    <Link href={"/"} className="flex"><Button iconLeft={ArrowLeft} state="transparent" >Voltar</Button></Link>
                    <div className="flex gap-3  w-full">
                        <Input state="default" placeholder="Buscar um topico" withIcon={<MagnifyingGlass size={20} />} className="max-w-[418px]" />
                        <Button>Buscar</Button>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <Button state="transparent" iconRight={FadersHorizontal}>Ordernar</Button>
                    <p className="font-medium text-sm">Pagina de 1 a 6</p>
                </div>


                <div className="grid gap-4">

                    <div className="grid gap-x-6 gap-y-4 grid-cols-2">
                        {Array.from({ length: 6 }).map((_, index) => {
                            return (
                                <Topic key={index} topicId={String(index)} />
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
    )
}