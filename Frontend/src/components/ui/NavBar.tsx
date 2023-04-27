import { useContext } from "react"
import { MenuIcon } from "./MenuIcon"
import { UiContext } from "@/context"; 


export const NavBar = () => {
  const { isOpenSideBar,openSideBar,closeSideBar } = useContext(UiContext)
  const handleToggleSidebar = () => {
    isOpenSideBar ? closeSideBar() : openSideBar()
  }
  return (
    <nav className="bg-violet-600 justify-between flex text-slate-50">
      <div className="cursor-pointer" onClick={ handleToggleSidebar }>
        <MenuIcon/>
      </div>
      <h1 className="text-[40px] font-semibold pb-2 mr-5">Open jira</h1>
    </nav>
  )
}