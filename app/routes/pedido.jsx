import styles from '~/styles/pedido.css'

export function meta() {
    return [
      {title: 'GuitarLA - Pedido'},
      {description: 'pedido de guitarras para su venta'}
    ]
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles 
        }
    ]
}

export default function pedido() {
  return (
    <div className='pedido'>
        Su pedido fue realizado con exito, se le contactará
        para la entrega de su compra
    </div>
  )
}
