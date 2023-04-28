import { FC, useContext } from "react";
import Head from "next/head"
import { SideBar,NavBar } from '../ui/';
import { UiContext } from "@/context";
import 'animate.css'; 

interface TodoLayOutProps {
    title:string; 
    description:string; 
    fullUrlImage?:string; 
    children: React.ReactNode; 
}

export const TodoLayOut:FC<TodoLayOutProps> = ({ title,description,fullUrlImage,children }) => {

  const { isOpenSideBar,isModalOpen,closeSideBar, closeModal } = useContext(UiContext); 


  const handleClose = () => {
    if(isOpenSideBar) closeSideBar();
  }

  return (
    <>
        <Head>
            <title>{title || "Jira"}</title>
            <meta name="Author" content="Guido Olguin"/>
            <meta name="keywords" content="Jira"/>
            <meta name="robots" content="index,follow" />
            <meta name="description" content={description || "Jira"} />
            <meta property="og:title" content={title || "Jira"} />
            <meta property="og:description" content={description || "Jira"} />
            {
                fullUrlImage &&<meta property="og:image" content={fullUrlImage || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.atlassian.com%2Fsoftware%2Fjira&psig=AOvVaw0Z4Z2Z3Z2Z3Z2Z3Z2Z3Z2Z&ust=1629788458974000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjQ4ZqHgvICFQAAAAAdAAAAABAD"} />
            }
        </Head>
        <header className={`fixed w-full z-10 shadow-sm`}>
          <NavBar/>
        </header>
        <aside className={`bg-slate-800 w-[260px] h-full fixed z-10 flex flex-col shadow-xl ${isOpenSideBar ? "animate__animated animate__slideInLeft animate__faster" : "hidden"}`}>
          <SideBar/>
        </aside>
        <main className={`${isOpenSideBar ? "blur-sm" : ''} h-screen p-20`} onClick={handleClose}>
          { children }
        </main>
    </>
  )
}   