import { Entry } from '@/interfaces'
import { EntriesState } from '.'


type EntriesActionType = 
 | { type: '[ENTRIES] - Add-entry',payload: Entry }

export const entriesReducer = (state:EntriesState,action:EntriesActionType ):EntriesState => {
    switch (action.type) {
        case '[ENTRIES] - Add-entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        default:
            return state
    }
}