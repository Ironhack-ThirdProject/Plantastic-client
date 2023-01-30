import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { InventoryDetails } from "../../components/DataDetails/InventoryDetails";
import { SalesDetails } from "../../components/DataDetails/SalesDetails";
import IsAdmin from "../../components/IsAdmin/isAdmin";

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const getAllOrders = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/order`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/plants`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllOrders();
    getAllProducts();
  }, []);

  return (
    <IsAdmin>
      <div>
        <h1>Dashboard Page</h1>
        <hr />

        <SalesDetails orders={orders} />

        <InventoryDetails products={products} />
      </div>
    </IsAdmin>
  );
}

export default DashboardPage;
