import { useEffect } from "react";
import { useState } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";


export function CategoryDetails({ products }) {
  const [plantsByCategory, setPlantsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPlants, setShowPlants] = useState(false);

  const getPlantsByCategory = () => {
    const productsCopy = [...products];
    const plantsGroupByCategory = productsCopy.reduce((acc, plant) => {
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
    } else {
      setSelectedCategory(category);
      setShowPlants(true);
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
  


  useEffect(() => {
    getPlantsByCategory();
  }, [products]);

  return (
    <div className="mt-5">
      <h3>Total stock of products per category</h3>
      <MDBTabs pills fill className='mb-3'>
      {Object.keys(plantsByCategory).map((category) => (
        <MDBTabsItem>
          <MDBTabsLink key={category}
              onClick={() => handleCategoryClick(category)}>
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
              <MDBTable>
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
