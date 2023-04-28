import { useState } from "react";
import { Entry } from "@/interfaces";

export const useDrag = (entries: Entry[]) => {
  const [pendingEntries, setPendingEntries] = useState<Entry[]>(
    entries.filter((entry) => entry.status === "pending")
  );
  const [inProgressEntries, setInProgressEntries] = useState<Entry[]>(
    entries.filter((entry) => entry.status === "in-progress")
  );
  const [completedEntries, setCompletedEntries] = useState<Entry[]>(
    entries.filter((entry) => entry.status === "completed")
  );

  const onDragEnd = (result:any) => {
    
    const { source, destination } = result;
    
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;

    let sourceList:Entry[]=[], destinationList:Entry[]=[];
    if (sourceListId === "pending") {
      sourceList = pendingEntries;
    } else if (sourceListId === "in-progress") {
      sourceList = inProgressEntries;
    } else if (sourceListId === "completed") {
      sourceList = completedEntries;
    }

    if (destinationListId === "pending") {
      destinationList = pendingEntries;
    } else if (destinationListId === "in-progress") {
      destinationList = inProgressEntries;
    } else if (destinationListId === "completed") {
      destinationList = completedEntries;
    }

    const [removed] = sourceList.splice(source.index, 1);

    destinationList.splice(destination.index, 0, removed);

    setPendingEntries([...pendingEntries]);
    setInProgressEntries([...inProgressEntries]);
    setCompletedEntries([...completedEntries]);
  };

  return {
    pendingEntries,
    inProgressEntries,
    completedEntries,

    onDragEnd,
  }
};
