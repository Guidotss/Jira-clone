import { Entry } from '@/interfaces';
import { createContext } from 'react'; 

export interface EntriesContextProps {
    entries: Entry[]; 

    addEntry: ( entry: Entry ) => void;
    updateStatus:( entry:Entry ) => void; 
    updateEntry: ( entry:Entry ) => void;
    deleteEntry: ( id:string ) => void;
}

export const EntriesContext = createContext({} as EntriesContextProps);