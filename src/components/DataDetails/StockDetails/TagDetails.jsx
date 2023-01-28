import { useEffect } from "react";
import { useState } from "react";

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
      .filter((product) => !selectedTag || product.tag === selectedTag)
      .forEach((product) => {
        total += product.stock;
      });
    return total;
  };

  useEffect(() => {
    getPlantsByTag();
  }, [products]);

  return (<div>
    <h1>Total stock of products per tag</h1>
      <div>
        <div>
          {Object.keys(plantsByTag).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
            >
              {selectedTag === tag && showPlants ? "Hide " : "Show "}
              {tag}
            </button>
          ))}
        </div>
        {showPlants && (
          <div>
            {selectedTag
              ? ( <>
                {plantsByTag[selectedTag].map((plant) => (
                  <p key={plant.id}>
                    {plant.name} - Stock: {plant.stock}
                  </p>
                ))}
                <h4>Total stock of {selectedTag} plants is {totalStock(selectedTag)}</h4>
                <h4>Unique products per tag: {plantsByTag[selectedTag].length}</h4>
                </>)
              : <></>}
          </div>
        )}
      </div>
  </div>);
}
