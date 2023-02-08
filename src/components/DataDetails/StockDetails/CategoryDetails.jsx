import { useEffect } from "react";
import { useState } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function CategoryDetails({ products }) {
  const [plantsByCategory, setPlantsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPlants, setShowPlants] = useState(false);

  const getPlantsByCategory = () => {
    const productsCopy = [...products];
    const plantsSortedByStock = productsCopy.sort((a, b) => a.stock - b.stock);
    const plantsGroupByCategory = plantsSortedByStock.reduce((acc, plant) => {
      const { category } = plant;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(plant);
      return acc;
    }, {});
    setPlantsByCategory(plantsGroupByCategory);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setShowPlants(false);
      // setActiveState(false)
    } else {
      setSelectedCategory(category);
      setShowPlants(true);
      // setActiveState(true)
    }
  };

  const totalStock = (selectedCategory) => {
    let total = 0;
    products
      .filter(
        (product) => !selectedCategory || product.category === selectedCategory
      )
      .forEach((product) => {
        total += product.stock;
      });
    return total;
  };



  const data1 = {
    labels: Object.keys(plantsByCategory),
    datasets: [{
      data: Object.keys(plantsByCategory).map((category) => totalStock(category)),
      backgroundColor: [
        'rgba(177, 250, 118, 0.6)',
        'rgba(197, 118, 250, 0.6)',
        'rgba(250, 204, 118, 0.6)',
        'rgba(118, 186, 250, 0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(177, 250, 118, 0.9)',
        'rgba(197, 118, 250, 0.9)',
        'rgba(250, 204, 118, 0.9)',
        'rgba(118, 186, 250, 0.9)',
      ],
      borderColor: [
        'rgb(84, 148, 0)',
        'rgb(118, 0, 187)',
        'rgb(150, 97, 0)',
        'rgb(0, 81, 187)',

      ],
      borderWidth : 1,
    }]
  };


  const data2 = {
    labels: Object.keys(plantsByCategory),
    datasets: [{
      data: Object.values(plantsByCategory).map((category) => category.length),
      backgroundColor: [
        'rgba(177, 250, 118, 0.6)',
        'rgba(197, 118, 250, 0.6)',
        'rgba(250, 204, 118, 0.6)',
        'rgba(118, 186, 250, 0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(177, 250, 118, 0.9)',
        'rgba(197, 118, 250, 0.9)',
        'rgba(250, 204, 118, 0.9)',
        'rgba(118, 186, 250, 0.9)',
      ],
      borderColor: [
        'rgb(84, 148, 0)',
        'rgb(118, 0, 187)',
        'rgb(150, 97, 0)',
        'rgb(0, 81, 187)',

      ],
      borderWidth : 1,
    }]
  };

  useEffect(() => {
    getPlantsByCategory();
  }, [products]);

  return (
    <div className="mt-5">
      <h3>Total stock of products per category</h3>
      <MDBRow>
        <MDBCol>
        <Doughnut data={data1}/>
        </MDBCol>
        <MDBCol>
        <Doughnut data={data2}/>    
        </MDBCol>
      </MDBRow>
      <MDBTabs pills fill className='mb-3'>
      {Object.keys(plantsByCategory).map((category) => (
        <MDBTabsItem>
          <MDBTabsLink key={category}
              onClick={() => handleCategoryClick(category)} id={selectedCategory === category ? `category-${category.replace(/\s+/g, '-')}` : ''} active={selectedCategory === category}>
            {category}
          </MDBTabsLink>
        </MDBTabsItem>
          ))} 
      </MDBTabs>
        {showPlants && (
          <>
          <div>
            {selectedCategory
              ? ( <>
              <MDBTable small>
          <MDBTableHead className="table-head-div">
          <tr className="table-dark">
          <th scope='col'>Name</th>
          <th scope='col'>Stock</th>
        </tr>
          </MDBTableHead>
          <MDBTableBody className="table-body-div">
          {plantsByCategory[selectedCategory].map((plant) => (
            <tr className="table-light" key={plant._id}>
              <td>{plant.name}</td>
              <td>{plant.stock}</td>
            </tr>
                ))}
            <tr className="table-secondary">
              <th scope="row">Total stock of {selectedCategory}</th>
              <td>{totalStock(selectedCategory)}</td>
            </tr>
            <tr className="table-secondary">
              <th scope="row">Unique products</th>
              <td>{plantsByCategory[selectedCategory].length}</td>
            </tr>
          </MDBTableBody>
        </MDBTable>
                </>)
              : <></> }
          </div>
          </>
        )}
    </div>
  );
}
