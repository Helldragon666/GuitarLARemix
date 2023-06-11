// archivo principal de la aplicación

import { useEffect, useState } from 'react'

import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from '@remix-run/react'

import Header from '~/components/header'
import Footer from '~/components/footer'

import styles from '~/styles/index.css'

// para hojas de estilos
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        },
    ]
}

export default function App() {

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null

    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(() => {
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    }, [carrito])

    const agregarCarrito = guitarra => {
        if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            //ya hay un registro - actualizar la cantidad
            const carritoActualizado = carrito.map(guitarraState => {
                if (guitarraState.id === guitarra.id) {
                    // aucilizar la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                }

                return guitarraState
            })

            setCarrito(carritoActualizado)

        } else {
            //registro nuevo - agregar al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        
        const carritoActualizado = carrito.map(guitarraState => {
            if (guitarraState. id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }

            return guitarraState
        })

        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {

        const carritoActualizado = carrito.filter(guitarraState => {
            return guitarraState.id !== id 
        })

        setCarrito(carritoActualizado)
    }

    return (
        <Document>
            <Outlet 
                context={{ //estado global de la aplicación
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}


//Layout Principal (agregar hojas de estilos, información meta, diseño principal)
function Document({children}) {
    return(
        <html lang="es">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta /> {/** para llamar la función meta */}
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts /> {/**para optimizar el sitio y prevenir recargas al cambio de página */}
                <LiveReload /> {/**para recargar automaticamente al guardar los cambios del código */}
            </body>
        </html>
    )
}


// ******* Manejo de Errores *****
export function ErrorBoundary() {

    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        return(
            <Document>
                <p className='error'>{error.status} {error.statusText}</p>
                <Link className='error-enlace'>Volver al inicio</Link>
            </Document>
        )
    }
}