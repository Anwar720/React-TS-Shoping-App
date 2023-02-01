import { useState,Dispatch, SetStateAction  } from "react"
import { Navbar } from "../components/Navbar"
import { Filter } from '../components/Filter'
import { ProductCard } from "../components/productCard"
import { FC } from "react"

type product = {
        name:string,
        image:string,
        price:number,
        type:string
}
type filter={
    isActive:boolean;
    price:number;
    types:{[key:string]:Boolean}
}

interface Iprops{
    cartCount:number,
    addToCart: (item:string)=>void,
    products:{[key:string]:product}
}

export const Home:FC<Iprops> = (props:Iprops)=>{
    const [activeFilters,setActiveFilters] = useState<filter>({
        isActive:false,
        price:0,
        types:{}
    })


    return (
        <div className="container">
            <Navbar cartCount = {props.cartCount}/>
            <main className="main-content-wrapper">
                <Filter filter={setActiveFilters} activeFilters={activeFilters}/>
                <div className="shop-items-container">
                    {[...Object.values(props.products)].map( (product,index) =>{

                        const isPriceMatch = !activeFilters.isActive || activeFilters.price === 0 || activeFilters.price >= product.price 
                        const isTypeMatch = [...Object.keys(activeFilters.types)].length == 0 || activeFilters.types[product.type] 
                        if(isPriceMatch && isTypeMatch) // apply filters
                            return <ProductCard key={index} product={product} addToCart={props.addToCart}/>
                        return <></>
                            
                    })}
                </div>
            </main>
        </div>
    )
}