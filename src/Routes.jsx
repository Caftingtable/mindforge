import { createBrowserRouter } from "react-router-dom";
import Roots from "./Components/Roots";
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Create_study_session from "./Components/Create_study_session";
import All_Study_Session from "./Components/All_Study_Session";
import Upload_Materials from "./Components/Upload_Materials";
import Upload_Materials_info from "./Components/Upload_Materials_info";
import View_all_materials from "./Components/View_all_materials";
import Update_Materials from "./Components/Update_Materials";
import Create_notes from "./Components/Create_notes";
import Manage_notes from "./Components/Manage_notes";
import Update_Notes from "./Components/Update_Notes";
import Session_details from "./Components/Session_details";
import View_booked_session from "./Components/View_booked_session";
import Booked_Session_details from "./Components/Booked_Session_details";
import Review_booked_session from "./Components/Review_booked_session";
import Study_Materials from "./Components/Study_Materials";
import Download_materials from "./Components/Download_materials";
import View_all_user from "./Components/View_all_user";
import View_All_Study_Session from "./Components/View_All_Study_Session";
import Update_Session from "./Components/Update_Session";
import View_All_Materials_admin from "./Components/View_All_Materials_admin";
import PrivateRoute from "./Components/PrivateRoute";
import ProtectedRoute from "./Components/ProtectedRoute";
import Payment from "./Components/Payment";
import Reject_Reason from "./Components/Reject_Reason";
import ErrorPage from "./Components/ErrorPage";
import All_study_session_user from "./Components/All_study_session_user";
import About_us from "./Components/About_us";
import Contact_us from "./Components/Contact_us";
import OverView from "./Components/OverView";
import Admin_Panel from "./Components/Admin_Panel";
import JoinUs from './Components/JoinUs';
import Tutors from './Components/Tutors';
import TutorProfile from './Components/TutorProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/all_session_user', element: <All_study_session_user /> },
      { path: '/tutors', element: <Tutors /> },
      { path: '/tutor_profile/:id', element: <TutorProfile /> },
      { path: '/registration', element: <Registration /> },
      { path: '/login', element: <Login /> },
      { path: 'session_details/:id', element: <PrivateRoute><Session_details /></PrivateRoute> },
      { path: 'payment/:id', element: <PrivateRoute><Payment /></PrivateRoute> },
      { path: '/about_us', element: <About_us /> },
      { path: '/contact_us', element: <Contact_us /> },
      { path: '/join_us', element: <JoinUs /> },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <ProtectedRoute allowedRoles={['admin']}><Admin_Panel /></ProtectedRoute>
      },
      // Tutor routes
      { path: 'create-study-session', element: <ProtectedRoute allowedRoles={['tutor']}><Create_study_session /></ProtectedRoute> },
      { path: 'all_study_session', element: <ProtectedRoute allowedRoles={['tutor']}><All_Study_Session /></ProtectedRoute> },
      { path: 'upload_materials', element: <ProtectedRoute allowedRoles={['tutor']}><Upload_Materials /></ProtectedRoute> },
      { path: 'upload_materials/:id', element: <ProtectedRoute allowedRoles={['tutor']}><Upload_Materials_info /></ProtectedRoute> },
      { path: 'all_materials', element: <ProtectedRoute allowedRoles={['tutor']}><View_all_materials /></ProtectedRoute> },
      { path: 'reject_reason', element: <ProtectedRoute allowedRoles={['tutor']}><Reject_Reason /></ProtectedRoute> },
      { path: 'update_materials/:id', element: <ProtectedRoute allowedRoles={['tutor']}><Update_Materials /></ProtectedRoute> },

      // Student routes
      { path: 'view_booked_session', element: <ProtectedRoute allowedRoles={['student']}><View_booked_session /></ProtectedRoute> },
      { path: 'create_note', element: <ProtectedRoute allowedRoles={['student']}><Create_notes /></ProtectedRoute> },
      { path: 'manage_notes', element: <ProtectedRoute allowedRoles={['student']}><Manage_notes /></ProtectedRoute> },
      { path: 'study_materials', element: <ProtectedRoute allowedRoles={['student']}><Study_Materials /></ProtectedRoute> },
      { path: 'booked_Details/:id', element: <ProtectedRoute allowedRoles={['student']}><Booked_Session_details /></ProtectedRoute> },
      { path: 'review_session/:id', element: <ProtectedRoute allowedRoles={['student']}><Review_booked_session /></ProtectedRoute> },
      { path: 'download_materials/:id', element: <ProtectedRoute allowedRoles={['student']}><Download_materials /></ProtectedRoute> },
      { path: 'update_note/:id', element: <ProtectedRoute allowedRoles={['student']}><Update_Notes /></ProtectedRoute> },

      // Admin routes
      { path: 'view_all_user', element: <ProtectedRoute allowedRoles={['admin']}><View_all_user /></ProtectedRoute> },
      { path: 'view_all_study_session', element: <ProtectedRoute allowedRoles={['admin']}><View_All_Study_Session /></ProtectedRoute> },
      { path: 'view_all_materials', element: <ProtectedRoute allowedRoles={['admin']}><View_All_Materials_admin /></ProtectedRoute> },
      { path: 'update_session/:id', element: <ProtectedRoute allowedRoles={['admin']}><Update_Session /></ProtectedRoute> },
    ]
  }
]);

export default router;
