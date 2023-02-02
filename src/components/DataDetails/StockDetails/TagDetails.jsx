import { useEffect } from "react";
import { useState } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";


export function TagDetails({ products }) {
  const [plantsByTag, setPlantsByTag] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const [showPlants, setShowPlants] = useState(false);

  const getPlantsByTag = () => {
    const productsCopy = [...products];
    const plantsGroupByTag = productsCopy.reduce((acc, plant) => {
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
  


  useEffect(() => {
    getPlantsByTag();
  }, [products]);

  return (
    <div className="mt-5">
      <h3>Total stock of products per tag</h3>
      <MDBTabs pills fill className='mb-3'>
      {Object.keys(plantsByTag).map((tag) => (
        <MDBTabsItem>
          <MDBTabsLink key={tag}
              onClick={() => handleTagClick(tag)}>
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
              <MDBTable>
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
              <th scope="row">Total stock of {selectedTag}</th>
              <td>{totalStock(selectedTag)}</td>
            </tr>
            <tr className="table-secondary">
              <th scope="row">Unique products</th>
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
