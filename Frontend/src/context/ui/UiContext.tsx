import { createContext } from 'react'; 


interface UiContextProps {
    isOpenSideBar:boolean;
    isModalOpen:boolean;

    openSideBar:() => void;
    closeSideBar:() => void;

    openModal:() => void;
    closeModal:() => void;
}

export const UiContext = createContext({} as UiContextProps); 