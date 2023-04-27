import { UiState } from './'


type UiActionType = 
 | { type: '[UI] - Open-Sidebar',payload: boolean }
 | { type: '[UI] - Close-Sidebar',payload: boolean }
 | { type: '[UI] - Open-Modal',payload: boolean }
 | { type: '[UI] - Close-Modal',payload: boolean }

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
    switch (action.type) {
        case '[UI] - Open-Sidebar':
            return {
                ...state,
                isOpenSideBar: action.payload
            }
        case '[UI] - Close-Sidebar':
            return {
                ...state,
                isOpenSideBar: action.payload
            }
        case '[UI] - Open-Modal':
            return {
                ...state,
                isModalOpen: action.payload
            }
        case '[UI] - Close-Modal':
            return {
                ...state, 
                isModalOpen: action.payload
            }
        default:
            return state;
    }
}