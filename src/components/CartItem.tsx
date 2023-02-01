import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus,faPlus } from '@fortawesome/free-solid-svg-icons'


type product = {
    product:{
        name:string,
        image:string,
        price:number,
        type:string
    },
    quantity:number,
    addToCart: (item:string)=>void,
    removeFromCart: (item:string)=>void,
}

const CartItem:FC<product> = (props:product) => {
    return (
        <div className='cart-item'>
            <img height="100" src={props.product.image} alt="" />
            <div className="item-column">
                <p>{props.product.name}</p>
                <div className="item-controls">
                    <p className='control-btn' onClick={()=>props.removeFromCart(props.product.name)}> <FontAwesomeIcon icon={faMinus}/></p>
                    <p className="quantity">{props.quantity}</p>
                    <p className='control-btn' onClick={()=>props.addToCart(props.product.name)}><FontAwesomeIcon icon={faPlus}/> </p>
                </div>
                <p>price: {props.product.price}</p>
            </div>

        </div>
    )
}

export {CartItem}