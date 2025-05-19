import React, { useContext, useEffect, useState } from 'react';
import { FaBars, FaHome, FaTimes } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-black.png';
import { AuthContext } from './Authentication';
import useUser from '../Hooks/useUser';
import { MdCreateNewFolder, MdOutlineManageHistory, MdPowerSettingsNew } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import { IoBookmarksOutline, IoBookOutline, IoCloudUploadOutline } from 'react-icons/io5';
import { ImCancelCircle } from 'react-icons/im';
import { LuNotebookPen } from 'react-icons/lu';
import { FiUsers } from 'react-icons/fi';
import { GoChecklist } from 'react-icons/go';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const { user, handleLogOut } = useContext(AuthContext);
  const { mongoUser, isPending } = useUser();
  const navigate = useNavigate();

  const userRole = mongoUser?.role;

  useEffect(() => {
    if (!isPending && userRole) {
      if (userRole === 'admin') navigate('/dashboard/view_all_user');
      else if (userRole === 'tutor') navigate('/dashboard/create-study-session');
      else if (userRole === 'student') navigate('/dashboard/view_booked_session');
    }
  }, [isPending, userRole, navigate]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Mobile navbar */}
      <div className="flex justify-between md:hidden w-11/12 mx-auto py-4 items-center border-b border-gray-300 bg-white shadow-sm">
        <img src={logo} width={'40%'} alt="MindForge Logo" />
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg bg-white border-r border-gray-200 text-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">
                  {userRole === 'admin' && 'Admin Dashboard'}
                  {userRole === 'tutor' && 'Tutor Dashboard'}
                  {userRole === 'student' && 'Student Dashboard'}
                </h2>
                <button className="md:hidden" onClick={toggleSidebar}>
                  <FaTimes size={24} />
                </button>
              </div>


          {/* Sidebar menu */}
          <nav className="py-4 px-3">
            <ul className="space-y-2">
              {/* Tutor Links */}
              {userRole === 'tutor' && <>
                <SidebarLink to="create-study-session" icon={<MdCreateNewFolder />} label="Create Session" />
                <SidebarLink to="all_study_session" icon={<CiViewList />} label="My Sessions" />
                <SidebarLink to="upload_materials" icon={<IoCloudUploadOutline />} label="Upload Materials" />
                <SidebarLink to="all_materials" icon={<CiViewList />} label="My Materials" />
                <SidebarLink to="reject_reason" icon={<ImCancelCircle />} label="Rejection Reasons" />
              </>}

              {/* Student Links */}
              {userRole === 'student' && <>
                <SidebarLink to="view_booked_session" icon={<IoBookmarksOutline />} label="Booked Sessions" />
                <SidebarLink to="create_note" icon={<LuNotebookPen />} label="Create Note" />
                <SidebarLink to="manage_notes" icon={<MdOutlineManageHistory />} label="Manage Notes" />
                <SidebarLink to="study_materials" icon={<IoBookOutline />} label="Study Materials" />
              </>}

              {/* Admin Links */}
              {userRole === 'admin' && <>
                <SidebarLink to="view_all_user" icon={<FiUsers />} label="All Users" />
                <SidebarLink to="view_all_study_session" icon={<LuNotebookPen />} label="All Study Sessions" />
                <SidebarLink to="view_all_materials" icon={<GoChecklist />} label="All Materials" />
              </>}

              <hr className="my-4" />

              {/* Home Link */}
              <SidebarLink to="/" icon={<FaHome />} label="Back to Home" />

              {/* Logout */}
              {user?.email && (
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center w-full p-3 rounded-lg text-start text-red-600 hover:bg-red-100 transition-all"
                  >
                    <MdPowerSettingsNew className="text-2xl mx-2" />
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>}
          <div className="p-6 md:ml-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? 'flex items-center w-full p-3 rounded-lg bg-primary text-white transition-all'
        : 'flex items-center w-full p-3 rounded-lg text-black hover:bg-blue-50 hover:text-blue-900 transition-all'
    }
  >
    {React.cloneElement(icon, { className: "text-2xl mx-2" })}
    {label}
  </NavLink>
);

export default Dashboard;
