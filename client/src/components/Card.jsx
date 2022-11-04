import React from 'react';
import "./Card.css";

 const Card = () => {
  return (
    <div class="card" style={{width: "18rem",border: "dashed",borderWidth:"0.2rem",margin: "30px"}}>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <p class="card-text" style={{
       fontSize: "15px" 
    }}>address</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

    
  )
}

export default Card;