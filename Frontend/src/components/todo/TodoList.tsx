import { FC } from "react";
import { Entry } from "@/interfaces";
import { Draggable } from "@hello-pangea/dnd";
import { TodoCard } from "./TodoCard";

interface TodoListProps {
  entries: Entry[];
}

export const TodoList:FC<TodoListProps> = ({ entries }) => {
  return (
    <>
      {entries.map((entry: Entry, index: number) => (
        <Draggable key={entry.id} draggableId={entry.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoCard entry={entry} />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};
