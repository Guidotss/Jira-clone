import { useContext } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { UiContext } from "@/context";
import { useDrag } from "@/hooks";
import { TodoList } from "./TodoList";


export const TodoGrid = () => {

  const { openModal } = useContext(UiContext);
  const { pendingEntries, completedEntries, inProgressEntries, onDragEnd } = useDrag(); 

  const handleOpenModal = () => {
    openModal();
  };



  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className="grid grid-cols-3 gap-20">
        <div className="h-screen bg-slate-800 flex flex-col items-center overflow-y-auto body-scroll-bar rounded-lg w-[350px]">
          <h1 className="text-2xl text-slate-50 tracking-wide mt-3">Pending</h1>
          <button 
            className="border-[1px] border-red-500 px-2 w-3/4 mt-2 rounded-full hover:bg-red-500"
            onClick={handleOpenModal}
          >
            <span className="text-slate-50 text-lg">New Entry</span>
          </button>
          <Droppable droppableId="pending">
            {(provided) => (
  
              <div
                className="flex flex-col h-screen p-1"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TodoList entries={pendingEntries} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      <div className="h-screen bg-slate-800 flex flex-col items-center overflow-y-auto body-scroll-bar rounded-lg w-[350px]">
        <h1 className="text-2xl text-slate-50 tracking-wide mt-3">In-progress</h1>
        <Droppable droppableId="in-progress">
          {(provided) => (
            <div
              className="flex flex-col h-screen p-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TodoList entries={inProgressEntries} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="h-screen bg-slate-800 flex flex-col items-center overflow-y-auto body-scroll-bar rounded-lg w-[350px]">
        <h1 className="text-2xl text-slate-50 tracking-wide m-3">Completed</h1>
        <Droppable droppableId="completed">
          {(provided) => (
            <div
              className="flex flex-col h-screen p-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TodoList entries={completedEntries} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
    </DragDropContext>
  );
};
