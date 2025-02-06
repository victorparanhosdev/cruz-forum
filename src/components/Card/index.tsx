import { ArrowBendDownLeft} from "@phosphor-icons/react/dist/ssr"

export const Card = () => {
    return (
        <div className="flex gap-2.5 px-3 py-2 border border-white rounded-lg hover:border-green-200 hover:bg-hover-btn-gray cursor-pointer">
        <img src="https://github.com/victorparanhosdev.png" alt="" className="h-8 w-8 object-cover rounded-full" />
        <div>
            <p className="text-sm font-medium">Titulo do Topico</p>
            <span className="flex items-center text-gray-400 gap-1 text-[10px]">
                <ArrowBendDownLeft size={16} /> comentado ha 6 minutos
            </span>

        </div>
    </div>
    )
}