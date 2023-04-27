import { FC, useEffect, useReducer} from 'react';
import { UiContext,uiReducer } from './';

export interface UiState {
    isOpenSideBar:boolean;
    isModalOpen:boolean;
}

interface UiProviderProps {
    children: React.ReactNode; 
}

const UI_INITIAL_STATE:UiState = {
    isOpenSideBar:false,
    isModalOpen:false,
}


export const UiProvider:FC<UiProviderProps> = ({ children }) => {
    const [ state, dispatch ] = useReducer(uiReducer,UI_INITIAL_STATE);
    
    useEffect(() => {
        console.log(state.isOpenSideBar); 
    },[state.isOpenSideBar]); 

    const openSideBar = () => {
        console.log('openSideBar')
        dispatch({ type:'[UI] - Open-Sidebar',payload:true });
    }

    const closeSideBar = () => {
        dispatch({ type:'[UI] - Close-Sidebar',payload:false });
    }

    const openModal = () => {
        dispatch({ type:'[UI] - Open-Modal',payload:true });
    }

    const closeModal = () => {
        dispatch({ type:'[UI] - Close-Modal',payload:false }); 
    }
    

    return (
        <UiContext.Provider value={{
            ...state,

            openSideBar,
            closeSideBar,
            openModal, 
            closeModal
        }} >
            { children }
        </UiContext.Provider>
    )
}