const router = require("express").Router();
const Order = require("../models/order");

//CREATE
router.post("/createorder", async (req, res) => {
  console.log("body req",req.body)

  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//GET USER ORDERS
router.get("/find/:userId",  async (req, res) => {

  console.log("Requested id is",req.params.userId);
  
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  
});



module.exports = router;