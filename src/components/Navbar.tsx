import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

interface Iprops{
    cartCount:number
}

export const Navbar:FC<Iprops> = (props:Iprops)=>{
    const navigate = useNavigate();

    return (
        <div className="nav">
            <div className="logo">Tech Central</div>
            <div className="shopingCart">
                <div onClick={()=>navigate("/cart", { replace: true })} className="cart-wrapper" >
                    <span className="cart-count">{props.cartCount}</span>
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
                </div>
        </div>
    )
}