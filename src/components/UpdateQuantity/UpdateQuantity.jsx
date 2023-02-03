import { MDBBtn, MDBInput, MDBCol, MDBRow, MDBInputGroup } from 'mdb-react-ui-kit';
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
    <>
    <form className='d-flex' onSubmit={handleSubmit}>
    <MDBRow>
      
        <MDBInputGroup>
      <input
      label="Quantity"
      className='form-control'
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(e.target.value)}
        min="1"
        max={productId.stock + quantity}
      />
      <MDBBtn className='btn btn-success' type="submit">Update</MDBBtn>
      </MDBInputGroup>
      </MDBRow>
    </form>
    </>
  )
}

export default UpdateQuantity