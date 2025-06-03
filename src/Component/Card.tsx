import React from "react";
import '../Style/eCard.css';
import type { products } from "./Home";

interface Items {
  id: number
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  onAddToCart: (item: products) => void; // Add this prop
}

const Card: React.FC<Items> = (props) => {
  return (
    <div className="box">
      <div className="container">
        <div id="img">
          <img style={{ width: "360px", height: "300px" }} src={props.thumbnail} alt="productimage" />
        </div>
        <div className="detail">
          <h5>{props.title}</h5>
          <h5><i className="fa-solid fa-indian-rupee-sign"></i>{props.price}</h5>
          <h6>{props.rating}/5</h6>
          <button onClick={ (e) => {
            // console.log("cart clicked")
              e.stopPropagation()
              props.onAddToCart({
                id: props.id,
                title: props.title,
                price: props.price,
                rating: props.rating,
                thumbnail: props.thumbnail,
              })
            }
          }>
            Add to Cart
          </button> 
        </div>
      </div>
    </div>
  );
}

export default Card;