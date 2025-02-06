import { Button } from "@/components/Button";
import { Input } from "@/components/InputText";
import { Label } from "@/components/Label";
import { Menu } from "@/components/Menu";

import { BookmarkSimple, ChatCircleDots, ChatText, PencilSimpleLine, User } from "@phosphor-icons/react/dist/ssr";

export default function Perfil() {
    return (
        <main className="bg-stone-950 rounded-xl px-4 py-12 ">

            <h1 className="text-3xl font-bold flex gap-2 mb-9">Perfil <User weight="bold" size={36} /></h1>

            <div className="p-6 flex gap-20">

                <div className="grid gap-9 justify-items-center">

                    <div className="relative w-fit">
                        <input type="file" name="upload-photo" id="upload-photo" className="sr-only" />
                        <img src="https://github.com/victorparanhosdev.png" alt="" className="object-cover w-52 h-52 rounded-full" />
                        <Label htmlFor="upload-photo" className="mb-0 cursor-pointer right-8 absolute bottom-0 rounded-full flex items-center bg-green-950 p-1.5"><PencilSimpleLine size={24} className="text-green-200" weight="fill" /></Label>
                    </div>

                    <div className="text-center">
                        <h2 className="font-bold text-3xl whitespace-nowrap">Victor Paranhos</h2>
                        <p className="text-gray-400 text-sm">victor_paranhos@hotmail.com</p>
                    </div>

                    <ul className="grid gap-4">

                        <li className="flex gap-2 items-center py-1 px-4"><ChatText size={24} /> 12 Topicos publicados</li>
                        <li className="flex gap-2 items-center py-1 px-4"><ChatCircleDots size={24} /> 6 comentarios</li>
                        <li className="flex gap-2 items-center py-1 px-4"><BookmarkSimple size={24} />5 Topicos salvos</li>
                    </ul>




                </div>
                <div className="w-px min-h-full bg-gray-800" />

                <div className="grid gap-9">
                    <h2 className="font-medium text-2xl">Alterar Dados: </h2>

                    <form action="" className="grid gap-4">
                        <div>
                            <Label>Nome:</Label>
                            <Input type="text" placeholder="Escreva seu nome" state="default" />
                        </div>
                        <div>
                            <Label>Email:</Label>
                            <Input type="email" placeholder="email@email.com" state="default" />
                        </div>
                        <div>
                            <Label>Senha Antiga:</Label>
                            <Input type="password" placeholder="*********" state="default" />
                        </div>
                        <div>
                            <Label>Nova senha:</Label>
                            <Input type="password" placeholder="*********" state="default" />
                        </div>
                    </form>

                    <div className="grid grid-flow-col gap-2">
                        <Button type="button" className="w-full" state="outline">Cancelar</Button>
                        <Button type="button" className="w-full">Salvar Alterações</Button>
                    </div>
                </div>


            </div>

        </main>
    )
}