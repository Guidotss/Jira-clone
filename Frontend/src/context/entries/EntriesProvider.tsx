import { FC, useReducer } from 'react'; 
import { EntriesContext,entriesReducer } from './';
import { Entry } from '@/interfaces';


interface EntriesProviderProps {
    children:React.ReactNode; 
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            id: '1',
            title: 'First Entry',
            description: 'This is the first entry on the list',
            status: 'pending'
        },
        {
            id: '2',
            title: 'Second Entry',
            description: 'This is the second entry on the list',
            status: 'in-progress'
        },
        {
            id: '3',
            title: 'Third Entry',
            description: 'This is the third entry on the list',
            status: 'completed'
        },
        {
            id: '4',
            title: 'Fourth Entry',
            description: 'This is the fourth entry on the list',
            status: 'pending'

        },
        {
            id: '5',
            title: 'Fifth Entry',
            description: 'This is the fifth entry on the list',
            status: 'in-progress'
        },
        {
            id: '6',
            title: 'Sixth Entry',
            description: 'This is the sixth entry on the list',
            status: 'completed'
        }
    ]
}


export const EntriesProvider:FC<EntriesProviderProps> = ({ children }) => {
    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE);


    const addEntry = ( entry:Entry ) => {
        dispatch({
            type: '[ENTRIES] - Add-entry',
            payload: entry
        }); 
    }

    return (
        <EntriesContext.Provider value={{
            ...state,

            addEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}