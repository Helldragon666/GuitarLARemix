import { Link } from "@remix-run/react"

export default function Guitarra({guitarra}) {

    const {descripcion, imagen, precio, url, nombre} = guitarra

    const { url: url_imagen } = imagen.data.attributes.formats.medium

  return (
    <div className="guitarra">
        <img src={url_imagen} alt={`imagen guitarra ${nombre}`} />
        <div className="contenido">
            <h3>{nombre}</h3>
            <p className="descripcion">{descripcion}</p>
            <p className="precio">${precio}</p>
            <Link 
                className="enlace"
                to={`/guitarras/${url}`}
            >Ver Producto</Link>
        </div>
    </div>
  )
}