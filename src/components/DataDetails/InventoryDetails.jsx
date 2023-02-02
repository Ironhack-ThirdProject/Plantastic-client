import { useEffect } from "react";
import { useState } from "react";
import { CategoryDetails } from "./StockDetails/CategoryDetails";
import { TagDetails } from "./StockDetails/TagDetails";
import "./Dashboard.css";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
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

  const totalStock = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.stock;
    });
    return total;
  };

  useEffect(() => {
    getProductDetails();
  }, [products]);

  return (
    <div className="main-div mb-8">
      <MDBCard className="mb-3">
        <MDBCardHeader className="card-header2">
          <MDBCardTitle className="card-title2">
            Inventory and stock data
          </MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody>

          <MDBTable>
          <MDBTableHead className="table-head-div">
                <tr className="table-dark">
                  <th scope="col">Metric</th>
                  <th scope='col'>Total</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody className="table-body-div">
                <tr className="table-secondary">
                  <td scope="row">Total Stock</td>
                  <td scope="row">{totalStock()}</td>
                </tr>
                <tr className="table-secondary"> 
                  <td scope="row">Unique products</td>
                  <td scope="row">{products.length}</td>
                </tr>
              </MDBTableBody>
          </MDBTable>

          <CategoryDetails products={products} />

          <TagDetails products={products} />
          <div className="mt-5">
            <h3>Low stock</h3>
            <MDBTable>
              <MDBTableHead className="table-head-div">
                <tr className="lowstock-title">
                  <th scope="col">Name</th>
                  <th scope="col">Stock</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody className="table-body-div">
                {lowStockProducts.map((product) => (
                  <tr className="table-danger" key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
