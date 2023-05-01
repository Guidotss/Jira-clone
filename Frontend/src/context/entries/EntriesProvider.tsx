import { FC, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { todoApi } from "@/api";
import { Entry } from "@/interfaces";
import { useSnackbar } from 'notistack'; 
interface EntriesProviderProps {
  children: React.ReactNode;
}

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  
  
  const getEntries = async () => {
    const { data } = await todoApi.get("/entries");
    dispatch({
      type: "[ENTRIES] - Load-entries",
      payload: data,
    });
  };

  const addEntry = async (entry: Entry) => {
    try {
      const { data } = await todoApi.post("/entries", entry);
      dispatch({
        type: "[ENTRIES] - Add-entry",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (entry: Entry) => {
    try {
      const { data } = await todoApi.patch(`/entries/${entry.id}`, entry);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEntry = async (entry: Entry) => {
    try {
      const { data } = await todoApi.patch(`/entries/${entry.id}`, entry);
      dispatch({
        type: "[ENTRIES] - Update-entry",
        payload: data,
      });
      enqueueSnackbar('Entry updated successfully', { variant: 'success'});
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getEntries();
  },[]); 

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        addEntry,
        updateStatus,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
