import React from "react";
import MobileList from "./MobileList";
import watch1 from "./watch1.json"
// const watch1 = [
//   {
//     image: "https://m.media-amazon.com/images/I/61twVfoFZBL._SX679_.jpg",
//     title: "TITAN WATCH",
//     price: "$100",
//   },
//   {
//     image: "https://m.media-amazon.com/images/I/6179Sh8soJL._SX342_.jpg",
//     title: "CAT LIGHT",
//     price: "$50",
//   },
// ];

export default function MObile() {
 
    return (
    <div>

        {watch1.map((ele)=>{
            
            return <MobileList
            image={ele.image}
            title={ele.title}
            price={ele.price}
          />
        })}
   

      {/* <MobileList
        image={watch2.image}
        title={watch2.title}
        price={watch2.price}
      /> */}
      {/* <MobileList></MobileList>
      <MobileList></MobileList>
      <MobileList></MobileList>
      <MobileList></MobileList> */}
    </div>
  );
}
