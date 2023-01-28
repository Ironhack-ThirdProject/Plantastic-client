import { useEffect } from "react";
import { useState } from "react";

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
    <div>
      <h1>Total stock of products per category</h1>
      <div>
        <div>
          {Object.keys(plantsByCategory).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              {selectedCategory === category && showPlants ? "Hide " : "Show "}
              {category}
            </button>
          ))}
        </div>
        {showPlants && (
          <div>
            {selectedCategory
              ? ( <>{plantsByCategory[selectedCategory].map((plant) => (
                  <p key={plant.id}>
                    {plant.name} - Stock: {plant.stock}
                  </p>
                ))}
                <h4>Total stock of {selectedCategory} plants is {totalStock(selectedCategory)}</h4>
                <h4>Unique products per category: {plantsByCategory[selectedCategory].length}</h4>
                </>)
              : <></> }
          </div>
        )}
      </div>
    </div>
  );
}
