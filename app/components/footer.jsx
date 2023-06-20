import Navegacion from "./navegacion"

function Footer() {
  return (
    <footer className="footer">
        <div className="contenedor contenido">
            <Navegacion />
            <p className="copyright">Todos los derechos reservados {new Date().getFullYear()}</p>
            <p>Teléfono: 55-64-87-69-56</p>
            <p>Correo: guitarla@gmail.com</p>
        </div>
    </footer>
  )
}

export default Footer