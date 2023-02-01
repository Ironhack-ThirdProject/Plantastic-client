import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { currencyFormatter } from "../../utils";
import OrderCard from "./OrderCard";

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
    <div>
      <h2 class="p-3 mb-2 bg-info text-white">Sales and revenue data</h2>
      <h2>Current orders: {orders.length}</h2>
      <OrderCard orders={orders} orderTotals={orderTotals} />
      <h3>
        Average Order Value: {averageOrderValue === NaN ? (currencyFormatter.format(0)) : (currencyFormatter.format(averageOrderValue))}
      </h3>
      <h3>Average Products Ordered: {averageProductsOrdered.toFixed(1)}</h3>
      <h2 class="p-3 mb-2 bg-secondary text-white">
        Total Revenue: {revenue === NaN ? (currencyFormatter.format(0)) : (currencyFormatter.format(revenue))}
      </h2>
      <hr />
    </div>
  );
}

