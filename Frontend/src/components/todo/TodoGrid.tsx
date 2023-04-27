import { useContext } from "react"
import { UiContext } from "@/context"


export const TodoGrid = () => {
  const { openModal } = useContext(UiContext); 

  const handleOpenModal = () => {
    openModal();
  }

  return (
    <div className="grid grid-cols-3 gap-10 h-screen">
      <div className="bg-slate-800 flex flex-col items-center overflow-auto">
        <h1 className="text-3xl text-slate-50 tracking-wide mt-2">Pending</h1>
        <div className="flex flex-col items-center mt-2 text-slate-50">
         <button className="text-lg border-[1px] border-red-500 rounded-full w-full px-10 mt-2 hover:bg-red-500" onClick={ handleOpenModal }>
           Create new todo
         </button>
        </div>
      </div>
      <div className="bg-slate-800 flex flex-col items-center">
        <h1 className="text-3xl text-slate-50 tracking-wide mt-2">In Progress</h1>
      </div>
      <div className="bg-slate-800 flex flex-col items-center">
        <h1 className="text-3xl text-slate-50 tracking-wide mt-2">Completed</h1>
      </div>
    </div>
  )
}
