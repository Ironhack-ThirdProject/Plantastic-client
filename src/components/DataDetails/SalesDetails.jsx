import { useEffect, useState } from "react";
import { currencyFormatter } from "../../utils";
import "./Dashboard.css";
import { getMonth, getWeek } from "date-fns";

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function SalesDetails({ orders }) {
  const [revenue, setRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [averageProductsOrdered, setAverageProductsOrdered] = useState(0);
  const [chartData, setChartData] = useState({});

  const getOrderTotals = () => {
    let totalRevenue = 0;
    let totalProducts = 0;

    orders.map((order) => {
      totalRevenue += order.totalPrice;
      totalProducts += order.products.length;
      setRevenue(totalRevenue);
      setAverageOrderValue(totalRevenue / orders.length);
      setAverageProductsOrdered(totalProducts / orders.length);
    });
  };

  const getMonthName = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getOrderData = () => {
    // Code to extract revenue data for each month from the orders array
    let monthOrders = {};
    let monthRevenues = {};
    orders.forEach((order) => {
      let createdAt = new Date(order.createdAt);
      let month = getMonthName(createdAt);
      if (!monthRevenues[month]) {
        monthRevenues[month] = 0;
        monthOrders[month] = 0;
      }
      monthRevenues[month] += order.totalPrice;
      monthOrders[month] += 1;
    });

    // Format the data for the chart
    let chartData = {};
    if (Object.keys(monthRevenues).length || Object.keys(monthOrders).length) {
      chartData = {
        labels: Object.keys(monthRevenues),
        datasets: [
          {
            label: "Monthly Revenue",
            data: Object.values(monthRevenues),
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            yAxisID: "revenue",
          },
          {
            label: "Monthly Orders",
            data: Object.values(monthOrders),
            backgroundColor: "#EDBB99 ",
            borderColor: "#DC7633",
            yAxisID: "orders",
          },
        ],
      };
    }

    setChartData(chartData);
  };

  const options = {
    responsive: true,
    hover: {
      mode: "index",
      intersec: false,
    },
    scales: {
      revenue: {
        type: "linear",
        position: "left",
        suggestedMin: 0,
        title: {
          display: true,
          text: "Montly Revenue (€)",
        },
      },
      orders: {
        position: "right",
        type: "linear",
        suggestedMin: 0,
        suggestedMax: 10,
        title: {
          display: true,
          text: "Montly Orders",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total orders and revenue per month",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  useEffect(() => {
    getOrderTotals();
    getOrderData();
  }, [orders]);

  return (
    <div className="main-div mb-8">
      <MDBCard className="mb-3">
        <MDBCardHeader className="card-header1">
          <MDBCardTitle className="card-title1">
            Sales and revenue data
          </MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBContainer fluid className="mb-4">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol lg={7} className="d-flex justify-content-center">
                {Object.keys(chartData).length > 0 && (
                  <Line data={chartData} options={options} />
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
                <MDBTable small>
                  <MDBTableHead className="table-head-div">
                    <tr className="table-dark">
                      <th scope="col">Metric</th>
                      <th scope="col">Total</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-body-div">
                    <tr className="table-light">
                      <th scope="row">Total Orders</th>
                      <td> {orders.length}</td>
                    </tr>
                    <tr className="table-light">
                      <th scope="row">Average Order Value</th>
                      <td>
                        {averageOrderValue === NaN
                          ? currencyFormatter.format(0)
                          : currencyFormatter.format(averageOrderValue)}
                      </td>
                    </tr>
                    <tr className="table-light">
                      <th scope="row">Average Products Ordered</th>
                      <td>{averageProductsOrdered.toFixed(1)}</td>
                    </tr>
                    <tr className="table-secondary">
                      <th scope="row">Total Revenue</th>
                      <td>
                        {revenue === NaN
                          ? currencyFormatter.format(0)
                          : currencyFormatter.format(revenue)}
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
