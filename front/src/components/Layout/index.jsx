import { Outlet } from 'react-router-dom'
import HeaderPages from '../HeaderPages'
import FooterPages from '../FooterPages'

const Layout = () => {
  return (
    <>
      <HeaderPages />

      <Outlet />

      <FooterPages />
    </>
  )
}

export default Layout
