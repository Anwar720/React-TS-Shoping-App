import React, { SetStateAction } from 'react'
import { FC } from 'react'

type product = {
    name:string,
    image:string,
    price:number,
    type:string,
}

interface Iproduct{
    product:product,
    addToCart:(item:string)=>void
}

export const ProductCard:FC<Iproduct> = (props:Iproduct)=> {
    return (
        <div className='product-card'>
            <div className="card-img">
                <img src={'../images/'+props.product.image} height="130"  alt="product img" />
            </div>
            <div className="product-info">
                <p className='card-title'>{props.product.name}</p>
                <p className='card-price'>price: ${props.product.price}</p>
                <button className='button' onClick={()=>props.addToCart(props.product.name)}> Add To Cart</button>
            </div>
        </div>
    )
}
