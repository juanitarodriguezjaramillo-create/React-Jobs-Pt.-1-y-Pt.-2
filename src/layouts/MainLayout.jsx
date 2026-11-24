import {Outlet} from 'react-router'
import Navbar from '../componentes/Navbar'
import {ToastContainer} from 'react-toastify/unstyled'

const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <ToastContainer/>
    </>
  )
}

export default MainLayout
