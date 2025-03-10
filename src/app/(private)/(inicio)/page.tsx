import { Button, Card, Input, Navigation, Topic } from '@/components'
import { TopicDialog } from '@/components/TopicDialog'
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLineLeft,
  CaretLineRight,
  Chats,
  FadersHorizontal,
  ListPlus,
  MagnifyingGlass,
  StarFour,
} from '@phosphor-icons/react/dist/ssr'

export default function Inicio() {
  return (
    <div className="grid min-h-view-without-fill w-full grid-cols-view-home gap-6 p-6">
      <Navigation />
      <main className="rounded-xl bg-stone-950 px-4 py-12">
        <h1 className="flex gap-2 text-3xl font-bold">
          Feed <Chats weight="bold" size={36} />
        </h1>

        <section className="grid gap-4 pt-9">
          <div className="flex gap-4">
            <div className="flex w-full  gap-3">
              <Input
                state="default"
                placeholder="Buscar um topico"
                withIcon={<MagnifyingGlass size={20} />}
              />
              <Button>Buscar</Button>
            </div>
            <TopicDialog>
              <Button iconLeft={ListPlus}>Criar tópico</Button>
            </TopicDialog>
          </div>

          <div className="flex items-center justify-between">
            <Button state="transparent" iconRight={FadersHorizontal}>
              Ordernar
            </Button>
            <p className="text-sm font-medium">Pagina de 1 a 6</p>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {Array.from({ length: 6 }).map((_, index) => {
                return <Topic key={index} topicId={String(index)} />
              })}
            </div>

            <div className="flex place-content-end items-center gap-2">
              <CaretDoubleLeft size={24} />
              <CaretLineLeft size={24} />
              <CaretLineRight size={24} />
              <CaretDoubleRight size={24} />
            </div>
          </div>
        </section>
      </main>
      <aside className="rounded-xl bg-stone-950 px-4 pt-12">
        <h2 className="mb-8 flex items-center gap-1 text-sm">
          {' '}
          <StarFour size={16} /> Mais Relevantes
        </h2>

        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => {
            return <Card key={index} />
          })}
        </div>
      </aside>
    </div>
  )
}
