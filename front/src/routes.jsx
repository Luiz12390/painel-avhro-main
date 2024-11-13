import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import DonaratyList from './pages/Donatary/List'
import DonaratyCreate from './pages/Donatary/Register'
import NotFound from './pages/NotFoud'
import DonationReceivedList from './pages/DonationReceived/List'
import DonationReceivedCreate from './pages/DonationReceived/Register'
import DonationDeliveredList from './pages/DonationDelivered/List'
import DonationDeliveredCreate from './pages/DonationDelivered/Register'
import FamilyList from './pages/Family/List'
import FamilyCreate from './pages/Family/Register'
import DonorList from './pages/Donor/List'
import DonorCreate from './pages/Donor/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },

      { path: 'donor', element: <DonorList /> },
      { path: 'donor-register/:id?', element: <DonorCreate /> },

      { path: 'donatary', element: <DonaratyList /> },
      { path: 'donatary-register/:id?', element: <DonaratyCreate /> },

      { path: 'donation-received', element: <DonationReceivedList /> },
      {
        path: 'donation-received-register/:id?',
        element: <DonationReceivedCreate />,
      },

      { path: 'donation-delivered', element: <DonationDeliveredList /> },
      {
        path: 'donation-delivered-register/:id?',
        element: <DonationDeliveredCreate />,
      },

      { path: 'family', element: <FamilyList /> },
      { path: 'family-register/:id?', element: <FamilyCreate /> },

      { path: '*', element: <NotFound /> },
    ],
  },
])

function AppRoutes() {
  return <RouterProvider router={router} />
}

export default AppRoutes
