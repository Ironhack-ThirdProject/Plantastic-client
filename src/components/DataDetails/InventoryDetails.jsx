import { useEffect } from "react";
import { useState } from "react";
import { CategoryDetails } from "./StockDetails/CategoryDetails";
import { TagDetails } from "./StockDetails/TagDetails";
import TotalStockDetails from "./StockDetails/TotalStockDetails";
import './Dashboard.css'

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBTable, MDBTableHead, MDBTableBody
} from "mdb-react-ui-kit";

export function InventoryDetails({ products }) {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const getProductDetails = () => {
    const productsCopy = [...products];
    const plantsSortedByStock = productsCopy.sort((a, b) => a.stock - b.stock);
    // const lowStock = productsCopy.slice(0, 5);
    const lowStock = plantsSortedByStock.filter(
      (product) => product.stock <= 10
    );
    setLowStockProducts(lowStock);
  };

  useEffect(() => {
    getProductDetails();
  }, [products]);

  return (
    <div className="main-div">
      <MDBCard className='mb-3'>
        <MDBCardHeader className="card-header2">
        <MDBCardTitle className="card-title2">Inventory and stock data</MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody>
        <MDBTable>
          <MDBTableHead className="table-head-div">
          <tr className="table-dark">
          <th scope='col'>Metric</th>
          <th scope='col'>Total</th>
        </tr>
          </MDBTableHead>
          <MDBTableBody className="table-body-div">
            <tr className="table-light">
              <th scope="row">Current Orders</th>
              <td> X</td>
            </tr>
            <tr className="table-light">
              <th scope="row">Average Order Value</th>
              <td>X</td>
            </tr>
            <tr className="table-light">
              <th scope="row">Average Products Ordered</th>
              <td>X</td>
            </tr>
            <tr className="table-secondary">
              <th scope="row">Total Revenue</th>
              <td>X</td>
            </tr>
          </MDBTableBody>
        </MDBTable>

        </MDBCardBody>
      </MDBCard>
      <h2 class="p-3 mb-2 bg-success text-white">Inventory and stock data</h2>
      <TotalStockDetails products={products} />

      <CategoryDetails products={products} />
      
      <TagDetails products={products} />
      <h3>Low stock: </h3>
      <ul>
        {lowStockProducts.map((product) => (
          <li key={product.id}>
            {product.name} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
