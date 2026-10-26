import { Outlet } from 'react-router-dom'
import Navigatie from './components/Navbar'

export default function App() {
  return (
    <>
      <Navigatie />
      <Outlet />
    </>
  )
}