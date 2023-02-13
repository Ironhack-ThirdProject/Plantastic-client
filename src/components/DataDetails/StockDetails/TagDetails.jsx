import { useEffect } from "react";
import { useState } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export function TagDetails({ products }) {
  const [plantsByTag, setPlantsByTag] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const [showPlants, setShowPlants] = useState(false);

  const getPlantsByTag = () => {
    const productsCopy = [...products];
    const plantsSortedByStock = productsCopy.sort((a, b) => a.stock - b.stock);
    const plantsGroupByTag = plantsSortedByStock.reduce((acc, plant) => {
      const { tag } = plant;
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(plant);
      return acc;
    }, {});
    setPlantsByTag(plantsGroupByTag);
  };

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setShowPlants(false);
    } else {
      setSelectedTag(tag);
      setShowPlants(true);
    }
  };

  const totalStock = (selectedTag) => {
    let total = 0;
    products
      .filter(
        (product) => !selectedTag || product.tag === selectedTag
      )
      .forEach((product) => {
        total += product.stock;
      });
    return total;
  };
  
  const data1 = {
    labels: Object.keys(plantsByTag),
    datasets: [{
      label: "Total Stock",
      data: Object.keys(plantsByTag).map((tag) => totalStock(tag)),
      backgroundColor: [
        'rgba(157, 221, 196, 0.6)',
        'rgba(201, 111, 51, 0.6)',
        'rgba(228, 147, 204, 0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(157, 221, 196, 0.9)',
        'rgba(201, 111, 51, 0.9)',
        'rgba(228, 147, 204, 0.9)',
      ],
      borderColor: [
        'rgb(0, 117, 111)',
        'rgb(77, 50, 0)',
        'rgb(117, 0, 59)',
      ],
      borderWidth : 1,
    }]
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stock levels by tag",
      },
    },
  }


  const data2 = {
    labels: Object.keys(plantsByTag),
    datasets: [{
      label: "Unique items",
      data: Object.values(plantsByTag).map((tag) => tag.length),
      backgroundColor: [
        'rgba(157, 221, 196, 0.6)',
        'rgba(201, 111, 51, 0.6)',
        'rgba(228, 147, 204, 0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(157, 221, 196, 0.9)',
        'rgba(201, 111, 51, 0.9)',
        'rgba(228, 147, 204, 0.9)',
      ],
      borderColor: [
        'rgb(0, 117, 111)',
        'rgb(77, 50, 0)',
        'rgb(117, 0, 59)',
      ],
      borderWidth : 1,
    }]
  };

  const options2 = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Unique items by tag",
      },
    },
  }

  useEffect(() => {
    getPlantsByTag();
  }, [products]);

  return (
    <div className="mt-5">
      <h3>Products by tag</h3>
      <MDBContainer fluid className="mb-4">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6" lg="3" className="d-flex justify-content-center">
        <Doughnut data={data1} options={options1}/>
        </MDBCol>
        <MDBCol md="6" lg="3" className="d-flex justify-content-center">
        <Doughnut data={data2} options={options2}/>    
        </MDBCol>
      </MDBRow>
      </MDBContainer>
      <MDBTabs pills fill className='mb-3'>
      {Object.keys(plantsByTag).map((tag) => (
        <MDBTabsItem>
          <MDBTabsLink key={tag}
              onClick={() => handleTagClick(tag)} id={selectedTag === tag ? `tag-${tag.replace(/\s+/g, '-')}` : ''} active={selectedTag === tag}>
            {tag}
          </MDBTabsLink>
        </MDBTabsItem>
          ))} 
      </MDBTabs>
        {showPlants && (
          <>
          <div>
            {selectedTag
              ? ( <>
              <MDBTable small>
          <MDBTableHead className="table-head-div">
          <tr className="table-dark">
          <th scope='col'>Name</th>
          <th scope='col'>Stock</th>
        </tr>
          </MDBTableHead>
          <MDBTableBody className="table-body-div">
          {plantsByTag[selectedTag].map((plant) => (
            <tr className="table-light" key={plant._id}>
              <td>{plant.name}</td>
              <td>{plant.stock}</td>
            </tr>
                ))}
            <tr className="table-secondary">
              <th scope="row">Stock levels of {selectedTag}</th>
              <td>{totalStock(selectedTag)}</td>
            </tr>
            <tr className="table-secondary">
              <th scope="row">Unique items</th>
              <td>{plantsByTag[selectedTag].length}</td>
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
