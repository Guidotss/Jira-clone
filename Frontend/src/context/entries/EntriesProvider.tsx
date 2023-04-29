import { FC, useEffect, useReducer } from 'react'; 
import { EntriesContext,entriesReducer } from './';
import { todoApi } from '@/api'
import { Entry } from '@/interfaces';

interface EntriesProviderProps {
    children:React.ReactNode; 
}

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider:FC<EntriesProviderProps> = ({ children }) => {
    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE);

    useEffect(() => {
        getEntries(); 
    },[]); 

    const getEntries = async () => {
        const { data } = await todoApi.get('/entries');
        dispatch({
            type: '[ENTRIES] - Load-entries',
            payload: data
        })
    }

    const addEntry = async ( entry:Entry ) => {
        try{
            const { data } = await todoApi.post('/entries', entry);
            dispatch({
                type: '[ENTRIES] - Add-entry',
                payload: data
            }); 
        }catch(error){
            console.log(error); 
        }
    }


    return (
        <EntriesContext.Provider value={{
            ...state,

            addEntry,
            
        }}>
            { children }
        </EntriesContext.Provider>
    )
}