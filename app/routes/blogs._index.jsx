import { useLoaderData } from "@remix-run/react"

import ListadoBlogs from "~/components/listado-blogs"

import { getBlogs } from "~/models/blogs.server"

export function meta() {
  return [
    {title: 'GuitarLA - Blog'},
    {description: 'blog de música'}
  ]
}

export async function loader() {
  const blogs = await getBlogs()
  return blogs.data
}

function BlogsIndex() {

  const blogs = useLoaderData()

  return (
    <ListadoBlogs
      blogs={blogs}
    />
  )
}

export default BlogsIndex