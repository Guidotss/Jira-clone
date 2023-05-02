import { FormEvent, useContext, useState } from "react";
import { EntriesContext, UiContext } from "@/context";
import { Entry, EntryStatus } from "@/interfaces";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";


interface FormInput {
  title: string; 
  description: string;
  status: EntryStatus;
}

export const TodoModal = () => {
  
  const { register, handleSubmit, formState:{errors} } = useForm<FormInput>(); 
  const { isModalOpen,closeModal } = useContext(UiContext); 
  const { addEntry } = useContext(EntriesContext);

  const handleCloseModal = () => {
    closeModal();
  }

  const onSubmit = ({title, description, status}:FormInput) => {

    if(!title || !status) return;

    const newEntry:Entry = {
      id:uuid(),
      title, 
      description, 
      status, 
      createdAt:new Date().toISOString().split("T")[0]
    }
    addEntry(newEntry);
    closeModal();
  }

  return (
    <div className={`z-10 text-slate-50 ${isModalOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-slate-800 h-[60vh] w-[50vw] flex flex-col items-center rounded-md">
          <div className="border-b-[1px] w-full flex justify-center">
            <h1 className="mt-2 text-2xl mb-2 font-semibold">
              Create new Todo
            </h1>
            <button className="absolute right-[24vw] top-[18vh] bg-slate-800 rounded-full px-2" onClick={ handleCloseModal }>
              <span className="text-xl">X</span>
            </button>
          </div>
          <div className="flex flex-col items-center mt-10 2xl:mt-28">
            <form className="flex flex-col" onSubmit={ handleSubmit(onSubmit) }>
              <input 
                className="w-[350px] p-1 rounded-md bg-slate-700 text-slate-50 placeholder:text-slate-300 px-2 2xl:w-[400px] 2xl:py-3"
                placeholder="Title"
                {...register("title", { required: true })}
                />
              {errors.title && <span className="text-red-500">Title is required!</span>}
              <textarea
                className="w-[350px] p-1 rounded-md bg-slate-700 text-slate-50 placeholder:text-slate-300 px-2 mt-2 2xl:w-[400px] 2xl:py-3"
                placeholder="Description"
                {...register("description", { required: false })}
              />
              <select
                className="w-[350px] p-1 rounded-md bg-slate-700 text-slate-50 placeholder:text-slate-300 px-2 mt-2 2xl:w-[400px] 2xl:py-3"
                {...register("status", { required: true })}
                {...errors.status && <span className="text-red-500">Status is required!</span>}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex justify-center mt-2">
                <button className="text-lg border-[1px] border-red-500 rounded-full w-full px-10 mt-2 hover:bg-red-500">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
