import { useContext, useState } from "react";
import { UiContext } from "@/context";
import { TodoList } from "./TodoList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { EntriesContext } from "@/context/entries";
import { Entry } from "@/interfaces";

export const TodoGrid = () => {


  const { openModal } = useContext(UiContext);
  const { entries } = useContext(EntriesContext)
  const [ entriesState, setEntriesState ] = useState<Entry[]>(entries)

  const pendingEntries = entries.filter((entry) => entry.status === "pending");
  const inProgressEntries = entries.filter((entry) => entry.status === "in-progress");
  const completedEntries = entries.filter((entry) => entry.status === "completed");


  const handleOpenModal = () => {
    openModal();
  };

  const onDragEnd = () => {
    console.log("hola");
  };
  const onDragStart = () => {
    console.log("hola");
  }

  

  return (
    <DragDropContext onDragEnd={(result) => {
      const { destination, source } = result; 
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const newEntries = Array.from(entriesState);
      const [ removed ] = newEntries.splice(source.index, 1);
      newEntries.splice(destination.index, 0, removed);
      setEntriesState(newEntries);


    }}>
    
      <div className="grid grid-cols-3 gap-20">
        <div className="h-screen bg-slate-800 flex flex-col items-center">
          <h1 className="text-2xl text-slate-50 tracking-wide" >Pending</h1>
          <Droppable droppableId="pending">
            {(provided) => (
              <div
                className="flex flex-col"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TodoList entries={pendingEntries}/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="h-screen bg-slate-800 flex flex-col items-center">
          <h1 className="text-2xl text-slate-50 tracking-wide" >In-progress</h1>
          <Droppable droppableId="in-progress">
            {(provided) => (
              <div
                className="flex flex-col"
                {...provided.droppableProps}  
                ref={provided.innerRef}
              >
                <TodoList entries={inProgressEntries}/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="h-screen bg-slate-800 flex flex-col items-center">
          <h1 className="text-2xl text-slate-50 tracking-wide">Completed</h1>
          <Droppable droppableId="completed">
            {(provided) => (
              <div
                className="flex flex-col"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TodoList entries={completedEntries}/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};
