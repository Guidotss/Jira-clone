import { Entry } from "@/interfaces"
import { FC } from "react"

interface TodoCardProps {
  entry: Entry
}

export const TodoCard:FC<TodoCardProps> = ({ entry }) => {
  return (
    <>
        <div className="flex flex-col items-center">
            <div className="bg-slate-700 2xl:w-[450px] 2xl:mt-5 w-[330px] rounded-md p-2">
                <h1 className="text-2xl text-slate-50 tracking-wide">{ entry.title }</h1>
                <p className="text-slate-50 tracking-wide">{ entry.description }</p>
                <p className="text-slate-50 tracking-wide">{ entry.status }</p>
            </div>
        </div>
    </>
  )
}