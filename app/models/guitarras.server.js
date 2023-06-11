// para hacer procesos del lado del servidor
export async function getGuitarras() {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`)
    return await respuesta.json()
}

export async function getGuitarra(guitarraUrl) {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${guitarraUrl}&populate=imagen`)
    return await respuesta.json()
}