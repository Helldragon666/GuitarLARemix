import { useState, useEffect } from 'react'

import { useOutletContext, useNavigate } from '@remix-run/react'

import { ClientOnly } from 'remix-utils'

import styles from '~/styles/carrito.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta() {
  return [
    {title: 'GuitarLA - Carrito de compras'},
    {description: 'pedido de guitarras para su venta'}
  ]
}

export default function Carrito() {

  const [total, setTotal] = useState(0)
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState(false)

  const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext()

  useEffect(() => {
    
    const calculoTotal = carrito.reduce((total, producto) => {
      return total + (producto.cantidad * producto.precio)
    }, 0)

    setTotal(calculoTotal)

  }, [carrito])

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    if ([nombre, correo, direccion].includes('')) {
      return setError(true)
    } else {
      setError(false)
      navigate('/pedido')
    }
  }

  console.log(carrito)

  return (
    <ClientOnly fallback={'Cargando...'}>
      {() => (
        <main className="contenedor">
        <h1 className="heading">Carrito de compras</h1>
        <div className="contenido">
          <div className="carrito">
            <h2>Artículos</h2>
  
            {carrito?.length === 0 ? (
              <div className='vacio'>
                <p>Carrito vacio</p>
              </div>
            ) : (
              carrito?.map(producto => (
                <div key={producto.id} className='producto'>
                  <div className='imagen'>
                    <img src={producto.imagen} alt={`imagen del producto ${producto.nombre}`} />
                  </div>
                  <div>
                    <p className="nombre">{producto.nombre}</p>
                    <p>Cantidad: </p>
                    <select
                      value={producto.cantidad}
                      onChange={e => actualizarCantidad({
                        cantidad: +e.target.value,
                        id: producto.id,
                      })}
                      className='select'
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <p className="precio"><span>${producto.precio}</span></p>
                    <p className="subtotal">Subtotal: <span>${producto.cantidad * producto.precio}</span></p>
                  </div>
                  <button 
                    type='button'
                    className='btn_eliminar'
                    onClick={() => eliminarGuitarra(producto.id)}
                  >
                      X
                  </button>
                </div>
              ))
            )}
  
          </div>
          <aside className="resumen">
            <h3>Resumen del pedido</h3>
            <p>Total a pagar: ${total}</p>
            <form 
              className='formulario'
              onSubmit={handleSubmit}
            >
              {error && (
                <div>
                  Llene todos los campos
                </div>
              )}
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text"
                id='nombre'
                value={nombre}
                onChange={e => setNombre(e.target.value)} 
              />
              <label htmlFor="correo">Correo</label>
              <input 
                type="email"
                id='correo'
                value={correo} 
                onChange={e => setCorreo(e.target.value)}
              />
              <label htmlFor="direccion">Dirección</label>
              <input 
                type="text" 
                id='direccion'
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
              />
              <input type="submit" value="Realizar Pedido" />
            </form>
          </aside>
        </div>
      </main>
      )}
    </ClientOnly>
  )
}
