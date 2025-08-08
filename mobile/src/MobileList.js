import React from 'react'
import './MobileList.css'
export default function MobileList(props) {
  
//   const image="https://m.media-amazon.com/images/I/61twVfoFZBL._SX679_.jpg"
//   const price="$100"
//   const title="TITAN WATCH"

const {image, title, price}=props;

    return (

 <div className='main'>
      <img src={image} className='image' alt='WATCH'></img>
      <div>
      <h1>{title}</h1>
      <p>{price}</p>
    <button>Add To Cart</button>
    </div>
    </div>
   
  )
}
