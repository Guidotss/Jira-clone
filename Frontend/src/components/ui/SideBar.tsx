import { SearchIcon } from "./SearchIcon"

export const SideBar = () => {

  return (
    <nav className="text-slate-50 flex flex-col">
      <ul className="mt-3">
        <li>
          <div className="flex flex-col items-center">
            <input
              className="rounded-md bg-slate-700 text-slate-50 p-2 w-[235px]"
              type="text"
            />
            <div className="absolute right-3 top-4 rounded-full w-10">
              <button>
                <SearchIcon/>
              </button>
            </div>
            <div className="mt-2 w-full divider" />
          </div>
        </li>
        
      </ul>
    </nav>
  )
}
