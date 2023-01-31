import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function UpdateQuantity({ productId, quantity, onUpdateQuantity }) {
    const [newQuantity, setNewQuantity] = useState(quantity);
    const idOfTheProduct = typeof productId === "object" ? productId._id : productId;
    
      const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateQuantity(idOfTheProduct, newQuantity);
      };
    

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(e.target.value)}
        min="1"
        max={productId.stock + quantity}
      />
      <Button variant='success' type="submit">Update Quantity</Button>
    </form>
  )
}

export default UpdateQuantity