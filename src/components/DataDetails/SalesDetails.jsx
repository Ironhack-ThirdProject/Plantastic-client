import { useEffect } from "react";
import { useState } from "react";
import { currencyFormatter } from "../../utils";
import './Dashboard.css'

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBTable, MDBTableHead, MDBTableBody
} from "mdb-react-ui-kit";


export function SalesDetails({ orders }) {
  const [revenue, setRevenue] = useState(0);
  const [orderTotals, setOrderTotals] = useState([]);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [averageProductsOrdered, setAverageProductsOrdered] = useState(0);

  const getOrderTotals = () => {
    let totalRevenue = 0;
    let totalProducts = 0;

    orders.map(order => {
      totalRevenue += order.totalPrice
      totalProducts += order.products.length
      setRevenue(totalRevenue)
      setAverageOrderValue(totalRevenue / orders.length)
      setAverageProductsOrdered(totalProducts / orders.length)
    })
  };

  useEffect(() => {
    getOrderTotals();
  }, [orders]);

  return (
    <div className="main-div">
      <MDBCard className='mb-3'>
        <MDBCardHeader className="card-header1">
        <MDBCardTitle className="card-title1">Sales and revenue data</MDBCardTitle>
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
              <td> {orders.length}</td>
            </tr>
            <tr className="table-light">
              <th scope="row">Average Order Value</th>
              <td>{averageOrderValue === NaN ? (currencyFormatter.format(0)) : (currencyFormatter.format(averageOrderValue))}</td>
            </tr>
            <tr className="table-light">
              <th scope="row">Average Products Ordered</th>
              <td>{averageProductsOrdered.toFixed(1)}</td>
            </tr>
            <tr className="table-secondary">
              <th scope="row">Total Revenue</th>
              <td>{revenue === NaN ? (currencyFormatter.format(0)) : (currencyFormatter.format(revenue))}</td>
            </tr>
          </MDBTableBody>
        </MDBTable>

        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

