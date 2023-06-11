import { useLoaderData } from "@remix-run/react"

import { getBlog } from "~/models/blogs.server"

import { formatearFecha } from "~/utils/helpers"

export function meta({data}) {

  return [
    {title: `GuitarLA - ${data.titulo}`},
    {description: `Blog de ${data.titulo}`}
  ]
}

export async function loader({params}) {
    const {blogUrl} = params

    const blog = await getBlog(blogUrl)

    if (blog.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrada'
        })
    }

    return blog.data[0].attributes
}

export default function BlogUrl() {

    const blog = useLoaderData()

    const {titulo, contenido, imagen, publishedAt} = blog

   const { url: url_imagen } = imagen.data.attributes

  return (
    <article className="blog mt-10">
      <img className="imagen" src={url_imagen} alt={`imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
        </div>
    </article>
  )
}
