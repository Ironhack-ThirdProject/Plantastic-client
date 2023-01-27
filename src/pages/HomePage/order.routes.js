const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const Order = require("../models/Order.model");
const Product = require("../models/Product.model.js");
const User = require("../models/User.model.js");

// // CREATE an order
// router.post("/", isAuthenticated, (req, res, next) => {
//   const { plantId } = req.body;
//   const userId = req.payload._id;

//   const newOrder = {
//     user: userId,
//     products: plantId,
//   };

//   let userOrder;

//   Order.create(newOrder)
//     .then((response) => {
//       userOrder = response;
//       console.log("This is the user order: ", userOrder);
//       return User.findByIdAndUpdate(
//         userId,
//         { $push: { orders: userOrder } },
//         { new: true }
//       );
//     })
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// CREATE an order
router.post("/", isAuthenticated, (req, res, next) => {
  const { plantId } = req.body
  const userId = req.payload._id

const newOrder = {
  user: userId,
  products: plantId,
}

  Order.findOne({user: userId})
  .then((response) => {
    if (response === null) {
      return Order.create(newOrder)
    } else {
      return Order.findOneAndUpdate({user : userId}, {$push : {products: plantId}}, {new: true})
    }
  })
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    res.json(error)
  })

});

// GET my order
router.get("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Order.find({ user: userId })
    .populate("products")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

// UPDATE my order
router.put("/", isAuthenticated, (req, res, next) => {
  const { firstName, lastName, shippingAddress, billingAddress } = req.body;
  const userId = req.payload._id;

  Order.findOneAndUpdate(
    { user: userId },
    { firstName, lastName, shippingAddress, billingAddress },
    { new: true }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

// DELETE products in the order
router.delete("/", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  let plantId = req.query.id

  Order.findOneAndUpdate({ user: userId }, {$pull: {products: plantId}}, {new: true})
  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    console.log(error)
  })

})


module.exports = router;
