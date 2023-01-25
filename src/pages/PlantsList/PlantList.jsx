import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "../../components/AddProduct/AddProduct";
import { PlantCard } from "../../components/PlantCard/PlantCard";

export function PlantList() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllPlants = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/plants`)
      .then((response) => {
        if (searchQuery === "") {
          setPlants(response.data);
        } else {
          const plantsToDisplay = response.data.filter((singlePlant) => {
            return singlePlant.category === searchQuery;
          });
          setPlants(plantsToDisplay);  
        }
        
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllPlants();
  }, [searchQuery]);

  return (
    <div>
      <AddProduct refreshProjects={getAllPlants} />

      <form>
        <label>
          Search by Category:
          <select
            name="category"
            aria-label="category"
            onChange={(e) => setSearchQuery(e.target.value)}
          >
            <option value="">All Plants</option>
            <option value="Indoor Plants">Indoor Plants</option>
            <option value="Outdoor Plants">Outdoor Plants</option>
            <option value="Pet-Friendly">Pet-Friendly</option>
            <option value="Tropical">Tropical</option>
          </select>
        </label>
      </form>

      {plants.map((plant) => (
        <PlantCard key={plant._id} {...plant} />
      ))}
    </div>
  );
}
