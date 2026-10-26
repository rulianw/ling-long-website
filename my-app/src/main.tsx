import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Hoofdpagina from './pages/Hoofdpagina'
import Menu from './pages/Menu'
import TijdLocatie from './pages/TijdLocatie'
import OverOns from './pages/OverOns'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Hoofdpagina /> },
      { path: '/menu', element: <Menu /> },
      { path: '/tijd-locatie', element: <TijdLocatie /> },
      { path: '/over-ons', element: <OverOns /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)