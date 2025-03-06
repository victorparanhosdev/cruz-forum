import { ArrowBendDownLeft, BookmarkSimple, ChatCircle, Heart } from "@phosphor-icons/react/dist/ssr"
import Image from 'next/image'

export const Topic = () => {
    return (
        <div className="bg-topico-200 border border-stone-700 rounded-xl py-4 px-6 grid gap-4 hover:bg-topico-100 transition-colors">
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <Image height={64} width={64} src="https://github.com/victorparanhosdev.png" alt="" className="h-16 w-16 rounded-full object-cover" />
                    <div>
                        <h2 className="text-2xl font-bold">Titulo do Topico</h2>
                        <span className="flex gap-2 text-xs text-gray-400"> <ArrowBendDownLeft size={14} /> publicado há 5 minutos atras</span>
                    </div>
                </div>
                <button><BookmarkSimple size={28} /></button>

            </div>

            <p className="text-gray-100 w-full line-clamp-3 text-xs">description description description description description description description description description description description description description description.s   dsfsfvsfe....</p>

            <div className="text-sm flex gap-6 items-center">
                <button className="flex gap-2 items-center"><Heart size={20} /> 6 curtidas</button>
                <button className="flex gap-2 items-center"><ChatCircle size={20} /> 15 comentarios</button>
            </div>


        </div>
    )
}