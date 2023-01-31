const express = require("express");
const { isAuthenticated, checkAdmin } = require("../middleware/jwt.middleware");
const router = express.Router();
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model.js")

// CREATE an order
router.post("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Cart.findOne({ user: userId })
  .populate("products.productId")
    .then((cart) => {
      return Order.create({user: userId, products: cart.products, totalPrice: cart.totalPrice, firstName: req.body.firstName, lastName: req.body.lastName, shippingAddress: req.body.shippingAddress, billingAddress: req.body.shippingAddress})
    })
    .then((createdOrder) => {
      return Cart.deleteOne({ user: userId });
    })
    .then(() => {
      console.log("Cart deleted!")
      res.send("Order created and cart deleted!")
    })
    .catch((error) => {
      console.log("There is an error in here");
      res.json(error);
    });
});

// GET all orders
router.get("/", isAuthenticated, (req, res, next) => {

  Order.find()
  .populate("products.productId")
  .then((response) => {
    res.json(response);
  })
  .catch((error) => {
    res.json(error);
  });
});

// GET my orders
router.get("/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Order.find({ user: userId })
  .populate("products.productId")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
