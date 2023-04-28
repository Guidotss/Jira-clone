import { Entry } from '@/interfaces';
import { createContext } from 'react'; 

export interface EntriesContextProps {
    entries: Entry[]; 

    addEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as EntriesContextProps);