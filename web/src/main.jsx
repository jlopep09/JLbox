import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='flex flex-col justify-between min-h-lvh items-center w-full '>
      <div>
        <JLBoxHeader></JLBoxHeader>
        <Home></Home>
      </div>
      <JLBoxFooter></JLBoxFooter>
    </div>
    
  </StrictMode>,
)



function JLBoxHeader() {
  return (
    <header className="navbar bg-base-100 shadow-sm justify-between py-4 mt-4">
      <div className="flex max-w-2xs">
        <a className="btn btn-ghost text-xl">JLBox</a>
      </div>
      <div className="flex gap-2">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        <button className='btn btn-ghost'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 max-w-2xs">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
function JLBoxFooter() {
  return (
    <footer className='flex flex-row justify-center border border-neutral/5 py-4 ' ><p className='text-neutral/60'>José Antonio López Pérez - 2025</p></footer>
  )
}


