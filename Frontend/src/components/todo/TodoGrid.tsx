import { useContext, useState } from "react";
import { UiContext } from "@/context";
import { TodoList } from "./TodoList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { EntriesContext } from "@/context/entries";
import { Entry } from "@/interfaces";
import { useDrag } from "@/hooks";

export const TodoGrid = () => {

  const { openModal } = useContext(UiContext);
  const { entries } = useContext(EntriesContext);
  const { pendingEntries, completedEntries, inProgressEntries, onDragEnd } = useDrag(entries); 

  const handleOpenModal = () => {
    openModal();
  };


  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className="grid grid-cols-3 gap-20">
        <div className="h-screen bg-slate-800 flex flex-col items-center">
          <h1 className="text-2xl text-slate-50 tracking-wide">Pending</h1>
          <Droppable droppableId="pending">
            {(provided) => (
              <div
                className="flex flex-col"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TodoList entries={pendingEntries} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      <div className="h-screen bg-slate-800 flex flex-col items-center">
        <h1 className="text-2xl text-slate-50 tracking-wide">In-progress</h1>
        <Droppable droppableId="in-progress">
          {(provided) => (
            <div
              className="flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TodoList entries={inProgressEntries} />
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
