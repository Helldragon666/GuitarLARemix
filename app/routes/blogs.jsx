import { Outlet } from "@remix-run/react"

import styles from '~/styles/blogs.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

function Blogs() {

  return (
    <main className="contenedor">
      <Outlet />
    </main>
  )
}

export default Blogs