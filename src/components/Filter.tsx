import {Dispatch, SetStateAction, useState , useRef,ChangeEvent } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowDownShortWide, faCaretDown, faFilter, faXmark} from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'

type filter={
    isActive:boolean;
    price:number;
    types:{[key:string]:Boolean}
}

interface IsetFilter{
    filter: Dispatch<SetStateAction<filter>>,
    activeFilters:filter
}

export const Filter:FC<IsetFilter> = (props:IsetFilter) => {
    const [currentPrice,setCurrentPrice] = useState(0)
    const priceFilter = useRef<HTMLInputElement>(null);
    const phoneFilter = useRef<HTMLInputElement>(null);
    const macFilter   =   useRef<HTMLInputElement>(null);

    const filterClickHandler = ()=>{
        let price = (priceFilter.current as HTMLInputElement).value
        let phoneRefElement = (phoneFilter.current as HTMLInputElement)
        let macRefElement = (macFilter.current as HTMLInputElement)
        let typesObject:{[key:string]:Boolean} = {}
        
        if(phoneRefElement.checked === true)
            typesObject[phoneRefElement.value] = true
        if(macRefElement.checked === true)
            typesObject[macRefElement.value] = true
        
        props.filter({
            isActive:true,
            price:parseInt(price),
            types:typesObject
        })
    }
    const removeFilter = (name:string)=>{
        if(name === 'price')props.activeFilters.price = 0
        else    delete props.activeFilters.types[name]
        // uncheck filters UI
        if(name === 'iphone')
            (phoneFilter.current as HTMLInputElement).checked = false;
        else if (name === 'mac')
            (macFilter.current as HTMLInputElement).checked = false;
        //update filters
        props.filter({...props.activeFilters})
    }

    return (
        <div className='filter-container'>
            <div className="filter-results">
                <div className="results-wrapper">
                    {
                        props.activeFilters.price > 0? 
                            <div className="active-filter"><span>${props.activeFilters.price} </span> <FontAwesomeIcon icon={faXmark} onClick={()=>removeFilter('price')} /> </div>  :''
                    }
                    {
                        [...Object.keys(props.activeFilters.types)].map((item,key)=>{
                            return <div key={key} className="active-filter"><span>{item} </span> <FontAwesomeIcon icon={faXmark} onClick={()=>removeFilter(item)}/></div>
                        })
                    }
                </div>

                <input type="checkbox"  id="filter" />
                <label htmlFor="filter">
                    Filter  <FontAwesomeIcon icon={faArrowDownShortWide}/>
                </label>
            
            <div className="filter">
                {/* price filter */}
                <input type="checkbox" id="price-filter" className="filter-checkbox"/>
                <label htmlFor="price-filter">
                    <span >
                        <h3>Price</h3>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                    <div className="filter-section">
                        <div className="price-indicator" > Max Price: ${currentPrice}</div>
                        <input type="range" step={5} ref={priceFilter} onChange={(e)=>setCurrentPrice(price=> parseInt(e.target.value))} min={0}  max={2000} defaultValue={0} id="filter-price" />
                    </div>
                </label>
                {/* Brand Filter */}
                <input type="checkbox" id="brand-filter" className="filter-checkbox"/>
                <label htmlFor="brand-filter">
                    <span >
                        <h3>Type</h3>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                    <div className="filter-section">
                        <span>
                            <input className="type-filter" type="checkbox" ref={phoneFilter} id="filter-iphone" value='iphone'/>
                            <label htmlFor="filter-iphone">iphone</label>
                        </span>
                        <span>
                            <input className="type-filter" type="checkbox" ref={macFilter} id="filter-mac" value='mac' />
                            <label htmlFor="filter-mac">Macbook</label>
                        </span>
                    </div>
                </label>
                <button onClick={()=>filterClickHandler()} className='apply-btn'>Apply Filter</button>
            </div>
            </div>
        </div>
    )
}

