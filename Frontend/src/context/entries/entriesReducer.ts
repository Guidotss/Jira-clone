import { Entry } from '@/interfaces'
import { EntriesState } from '.'


type EntriesActionType = 
 | { type: '[ENTRIES] - Load-entries',payload: Entry[] }
 | { type: '[ENTRIES] - Add-entry',payload: Entry }
 | { type: '[ENTRIES] - Update-status',payload: Entry }
 | { type: '[ENTRIES] - Update-entry',payload: Entry}
 | { type: '[ENTRIES] - Update-entry',payload: string}
 | { type: '[ENTRIES] - Delete-entry',payload: string}
 
export const entriesReducer = (state:EntriesState,action:EntriesActionType ):EntriesState => {
    switch (action.type) {
        case '[ENTRIES] - Load-entries':
            return {
                ...state,
                entries: action.payload
            }
        case '[ENTRIES] - Add-entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[ENTRIES] - Update-status':
            return {
                ...state,
                entries: state.entries.map( entry => entry.id === action.payload.id ? action.payload : entry)
            }
        case '[ENTRIES] - Update-entry':
            return {
                ...state,
                entries: state.entries.map( entry => entry.id === action.payload.id ? action.payload : entry)
            }
        case '[ENTRIES] - Delete-entry':
            return {
                ...state,
                entries: state.entries.filter( entry => entry.id !== action.payload)
            }
        default:
            return state
    }
}