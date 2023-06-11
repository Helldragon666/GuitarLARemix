export default function Curso({curso}) {

    const {contenido, imagen, titulo} = curso

    const {url: url_imagen} = imagen.data[0].attributes

  return (
    <section className="curso">
        <style jsx='true'>{`
            .curso {
                background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${url_imagen});  
            }
        `}</style>
        <div className="contenedor curso-grid">
            <div className="contenido">
                <h2 className="heading">{titulo}</h2>
                <p className="texto">{contenido}</p>
            </div>
        </div>
    </section>
  )
}
