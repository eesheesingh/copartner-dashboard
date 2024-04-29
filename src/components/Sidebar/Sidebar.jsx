// Sidebar.jsx
import { useState, useRef } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import './Sidebar.css';
import Logo from '../../assets/copartner.png';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import userIcon from '../../assets/user-octagon.png'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const Logout = () => {
    sessionStorage.removeItem("chatId");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  // Function to check if the link is active
  const isLinkActive = (path) => {
    return location.pathname === path;
  };


  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="sidebar-button inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`sidebar-container fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="sidebar-content h-full px-7 py-4 overflow-y-auto bg-gray-50">
          <Link to="" className="brand-logo flex items-center ps-2.5 mb-5 pb-6 py-3">
            <img
              src={Logo}
              className="h-10 me-3 sm:h-10"
              alt="Logo"
            />
          </Link>
          <ul className="sidebar-menu space-y-4 font-medium">
          <li>
            <Link to="/" title="Dashboard" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/') ? 'active' : ''}`}>
              <img src={userIcon} alt='user-icon' className='w-6 h-6' />
              <span className="text-base font-bold ms-3">A.P</span>
            </Link>
          </li>
          <li>
            <Link to="/r.a" title="Overview" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/r.a') ? 'active' : ''}`}>
              <img src={userIcon} alt='user-icon' className='w-6 h-6' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">R.A</span>
            </Link>
          </li>
          <li>
            <Link to="/blogs" title="Settings" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/blogs') ? 'active' : ''}`}>
              <IoSettingsOutline className='text-2xl' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">Blog Upload</span>
            </Link>
          </li>
          <li>
            <Link to="/radetails" title="Settings" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/radetails') ? 'active' : ''}`}>
              <IoSettingsOutline className='text-2xl' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">R.A Details</span>
            </Link>
          </li>
          <li>
            <Link to="/apdetails" title="Settings" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/apdetails') ? 'active' : ''}`}>
              <IoSettingsOutline className='text-2xl' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">A.P Details</span>
            </Link>
          </li>
          <li>
            <Link to="/agencylist" title="Settings" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/agencylist') ? 'active' : ''}`}>
            <img src={userIcon} alt='user-icon' className='w-6 h-6' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">Ad Agency</span>
            </Link>
          </li>
          <li>
            <Link to="/transaction" title="Settings" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/transaction') ? 'active' : ''}`}>
            <img src={userIcon} alt='user-icon' className='w-6 h-6' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">Transaction</span>
            </Link>
          </li>
          <li>
            <Link to="/marketingcontent" title="Settings" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/marketingcontent') ? 'active' : ''}`}>
            <img src={userIcon} alt='user-icon' className='w-6 h-6' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">Marketing Content</span>
            </Link>
          </li>
          <li>
            <Link to="/userdata" title="Settings" className={`menu-item flex items-center px-4 py-3 rounded-lg hover:bg-gray-200 group ${isLinkActive('/userdata') ? 'active' : ''}`}>
            <img src={userIcon} alt='user-icon' className='w-6 h-6' />
              <span className="text-base font-bold flex-1 ms-3 whitespace-nowrap">User Data</span>
            </Link>
          </li>
      </ul>


          {/* Sign out button */}
          <button
            className="sign-out-button flex items-center px-4 py-3 text-gray-900 rounded-lg hover:bg-gray-200 group"
            onClick={Logout}
            title='Sign Out'
          >
            <BiLogOut className='text-2xl' />
            <span className="text-base font-bold ms-3">Logout</span>
          </button>
        </div>
      </aside>
      <Outlet />
    </>
  );
};

export default Sidebar;
 