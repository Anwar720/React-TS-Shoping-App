import { FC, useState } from 'react'
import { Navbar } from "../components/Navbar"
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowLeftLong,faShoppingBag, faXmark} from '@fortawesome/free-solid-svg-icons';
import {CartItem} from '../components/CartItem'

type cartItem = {
    [Key:string]:{
        name:string,
        quantity:number
    }
}
type product = {
    name:string,
    image:string,
    price:number,
    type:string
}
interface Iprops{
    cartCount:number,
    cartItems:cartItem,
    products:{[key:string]:product},
    addToCart: (item:string)=>void,
    removeFromCart: (item:string)=>void
}
export const Cart:FC<Iprops>  = (props:Iprops)=>{
    const navigate = useNavigate();
    const shopingCart = [...Object.values(props.cartItems)]
    let orderTotal:number = 0

    return (
        <div className="cart">
            <Navbar cartCount = {props.cartCount}/>
            <p className="back-btn" onClick={()=>navigate('/')}> <FontAwesomeIcon icon={faArrowLeftLong}/> Back to shoping</p>
            <div className="cart-container">

                <div className="cart-items">
                    <h3> <FontAwesomeIcon icon={faShoppingBag}/> Cart</h3>
                    <div className="items-container">
                        {
                            shopingCart.map((item,key)=>{
                                return <CartItem product={props.products[item.name]} quantity={item.quantity}
                                        removeFromCart={props.removeFromCart} addToCart={props.addToCart }/>
                            })
                        }
                    </div>
                </div>
                
                <div className="order-overview">
                    <h3>Order Summery</h3>
            
                    <div className="order-summery">
                        {shopingCart.map((item,key)=>{
                            const total = (item.quantity * props.products[item.name].price)
                            orderTotal += total
                            return <div className="summery-row" key={key}>
                                        <p>{item.name}</p>
                                        <FontAwesomeIcon icon={faXmark} />
                                        <p>{item.quantity}</p>
                                        <p>${total}</p>
                                    </div>
                        })}
                    </div>
                    <p className="shift-right cl-2"><span>Subtotal:</span> <span>${(orderTotal).toFixed(2)}</span></p>
                    <p className="shift-right cl-2"><span>Tax:</span> <span>${(orderTotal * 0.045).toFixed(2)}</span></p>
                    <p className='order-total shift-right cl-2'><span>Order Total:</span> <span>${(orderTotal * 0.045 + orderTotal).toFixed(2)}</span></p>
                    <button className='checkout-btn shift-right'>Checkout</button>
                </div>
            </div>
        </div>
    )
}