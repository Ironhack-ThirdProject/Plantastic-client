import { currencyFormatter } from "../../utils";
import { useState } from "react";

function OrderHistory({eachOrder}) {
    console.log(eachOrder);
  const [showProductsInOrder, setShowProductsInOrder] = useState(false);
  const handleAllProductsInOrderClick = () => {
    setShowProductsInOrder(!showProductsInOrder);
  };
  return (
    <div key={eachOrder._id}>
      <p>{new Date(eachOrder.createdAt).toLocaleDateString()}</p>
      <p>Total Price: {currencyFormatter.format(eachOrder.totalPrice)}</p>
      <button onClick={handleAllProductsInOrderClick}>
        {showProductsInOrder ? "Hide" : "Show All Purchased Plants"}
      </button>
      {showProductsInOrder && (
        <div>
          {eachOrder.products.map((oneProduct) => (
            <div>
              <p key={oneProduct.productId._id}>
                Name: {oneProduct.productId.name} Price:{" "}
                {currencyFormatter.format(oneProduct.productId.price)} X{" "}
                {oneProduct.quantity}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
