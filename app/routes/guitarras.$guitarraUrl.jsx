import { useState } from "react"

import { useLoaderData, useNavigate, useOutletContext } from "@remix-run/react"

import { getGuitarra } from "~/models/guitarras.server"

export function meta({data}) {

    return [
        {title: `GuitarLA - ${data[0].attributes.nombre}`},
        {description: `Venta de guitarra ${data[0].attributes.nombre}`}
    ]
}

export async function loader({params}) {
    const {guitarraUrl} = params
    const guitarra = await getGuitarra(guitarraUrl)

    if(guitarra.data.length === 0) {
        throw new Response('', {
            status: 404, 
            statusText: 'Guitarra no encontrada'
        })
    }

    return guitarra.data
}

function GuitarraUrl() {

    const {agregarCarrito} = useOutletContext()

    const [cantidad, setCantidad] = useState(0)

    const guitarra = useLoaderData()

    const {nombre, descripcion, imagen, precio} = guitarra[0].attributes

    const {url} = imagen.data.attributes

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        if (cantidad < 1) {
           return alert('Debes seleccionar una cantidad')
        }

        const guitarraSeleccionada = {
            id: guitarra[0].id,
            imagen: url,
            nombre,
            precio,
            cantidad
        }

        agregarCarrito(guitarraSeleccionada)

        navigate('/carrito')
    }

  return (
    <div className="guitarra">
        <img className="imagen" src={url} alt={`imagen de guitarra ${nombre}`} />
        <div className="contenido">
            <h3>{nombre}</h3>
            <p className="texto">{descripcion}</p>
            <p className="precio">${precio}</p>

            <form 
                className="formulario"
                onSubmit={handleSubmit}
            >
                <label htmlFor="cantidad">Cantidad</label>
                <select 
                    id="cantidad"
                    onChange={e => setCantidad(parseInt(e.target.value))}
                >
                    <option value="0">-- Seleccione --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input type="submit" value="Agregar al carrito" />
            </form>
        </div>
    </div>
  )
}

export default GuitarraUrl