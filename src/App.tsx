import { useEffect, useState, useRef } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import {Home} from './pages/Home.js'
import {Cart} from './pages/Cart.js'
import products from './data/products.json'

interface IcartItem {
  [key:string]: {
      name:string;
      quantity:number
  };
}

function App() {
  const [productList,setProductList] = useState({})
  const [cartCount,setCartCount] = useState(0)
  const [cart,setCart] = useState<IcartItem>({})

  //update cart by adding item to cart state 
  const addToCart = (item:string)=>{
    let list = Object.assign({}, cart); 
      if(!list[item])list[item] = {name:item,quantity:1}
      else  list[item].quantity = list[item].quantity + 1;    
    setCart({...list});
    setCartCount(count=>++count)
    return 
  }
  //update cart by removing 1 item to cart state 
  const removeFromCart = (item:string)=>{
    if(!cart[item]) return 
    let list = Object.assign({}, cart); 
      if(list[item].quantity > 1)list[item].quantity = list[item].quantity - 1
      else  delete list[item] 
    setCart({...list});
    setCartCount(count=> --count)
    return 
  }

  useEffect(()=>{
    setProductList(products)
  },[])

  return (
    <Routes>
      <Route path="/" element={
            <Home cartCount={cartCount} addToCart={addToCart} products={productList} />}
      />
      <Route path="/cart" element={<Cart cartCount={cartCount} cartItems={cart} products={productList} 
                                        removeFromCart={removeFromCart} addToCart={addToCart } />}/>
    </Routes>

  
  )
}

export default App
