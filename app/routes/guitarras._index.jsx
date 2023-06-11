import { useLoaderData } from "@remix-run/react"

import ListadoGuitarras from "~/components/listado-guitarras"

import { getGuitarras } from "~/models/guitarras.server"

export function meta() {
  return [
    {title: 'GuitarLA - Tienda de Guitarras'},
    {description: 'Nuestra colección de guitarras'}
  ]
}

//esta funcion siempre debe retornar algo
export async function loader() { // cuando el componente carga (consumir datos de una API)

  const guitarras =  await getGuitarras()

  return guitarras.data
}

function GuitarrasIndex() {

  const guitarras = useLoaderData() // para acceder a los datos del loader

  //console.log(guitarras)

  return (
    <ListadoGuitarras
      guitarras={guitarras}
    />
  )
}

export default GuitarrasIndex