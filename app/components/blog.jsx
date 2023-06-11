import { Link } from "@remix-run/react"

import { formatearFecha } from "~/utils/helpers"

export default function Blog({blog}) {

  const {titulo, contenido, imagen, url, publishedAt} = blog

  const {url: url_imagen} = imagen.data.attributes.formats.small

  return (
    <article className="blog">
      <img className="imagen" src={url_imagen} alt={`imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="resumen">{contenido}</p>
        <Link
          to={`/blogs/${url}`}
          className="enlace"
        >Leer entrada</Link>
      </div>
    </article>
  )
}
