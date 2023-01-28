import { useState } from "react";

function TotalStockDetails({ products }) {
  const [showPlants, setShowPlants] = useState(false);

  const handleAllPlantsClick = () => {
    setShowPlants(!showPlants);
  };

  const totalStock = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.stock;
    });
    return total;
  };

  return (
    <div>
      <h1>Total stock of all plants</h1>
      <button onClick={handleAllPlantsClick}>
            {showPlants ? "Hide All Plants" : "Show All Plants"}
          </button>
          {showPlants && (
            <div>
                {products.map(plant => (
                    <p key={plant.id}>
                    {plant.name} - Stock: {plant.stock}
                  </p>
                ))}
                <h4>Total stock of all plants is {totalStock()}</h4>
                <h4>Unique products: {products.length}</h4>
            </div>
          )}
    </div>
  );
}

export default TotalStockDetails;
