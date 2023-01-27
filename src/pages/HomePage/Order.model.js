const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: "Product",
        required: true,
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    totalPrice: { 
        type: Number,
        required: false
    },
    shippingAddress: { 
        type: String,
        required: false
    },
    billingAddress: { 
        type: String,
        required: false
    },
    status:{
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
