import { useEffect } from "react";
import { useState } from "react";
import { CategoryDetails } from "./StockDetails/CategoryDetails";
import { TagDetails } from "./StockDetails/TagDetails";
import TotalStockDetails from "./StockDetails/TotalStockDetails";

export function InventoryDetails({ products }) {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const getProductDetails = () => {
    const productsCopy = [...products];
    const plantsSortedByStock = productsCopy.sort((a, b) => a.stock - b.stock);
    // const lowStock = productsCopy.slice(0, 5);
    const lowStock = plantsSortedByStock.filter(
      (product) => product.stock <= 10
    );
    setLowStockProducts(lowStock);
  };

  useEffect(() => {
    getProductDetails();
  }, [products]);

  return (
    <div>
      <h2 class="p-3 mb-2 bg-success text-white">Inventory and stock data</h2>
      <TotalStockDetails products={products} />

      <CategoryDetails products={products} />
      
      <TagDetails products={products} />
      <h3>Low stock: </h3>
      <ul>
        {lowStockProducts.map((product) => (
          <li key={product.id}>
            {product.name} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
