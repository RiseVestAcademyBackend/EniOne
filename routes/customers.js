var express = require('express');
var router = express.Router();





 const data = [
    {customerId : 1, title :  "Iron Man", year :  '2008'},
    {customerId : 2, title :  "Thor", year :  '2010'},
    {customerId : 3, title :  "Captain American", year :  '2018'},
    {customerId : 4, title :  "King of Boys", year :  '2028'},
  ]
  
//    return all customers information
  router.get("/customers",  (req,res,next) => {
    res.status(200).json(data);
  })

  // add a new customer
  router.post("/customers",  (req,res,next) => {
    res.status(200).json(data.push({}));
  })
  
  // effect change on all rows in your table
  router.put("/customers",  (req,res,next) => {
    res.status(200).json(data);
  })
  
  // delete the entire table
  router.delete("/customers",  (req,res,next) => {
    res.status(200).json(data);
  })
  
  // get a particular customer given its Id
  router.get("/customers/:customerId",  (req,res,next) => {
    const customerId = req.params.customerId

    res.status(200).json(data[customerId]);
  })
  router.put("/customers/:customerId",  (req,res,next) => {
    res.status(200).json(data);
  })
  router.delete("/customers/:customerId",  (req,res,next) => {
    res.status(200).json(data);
  })
  router.get("/customers/:customerId/orders",  (req,res,next) => {
    res.status(200).json(data);
  })
  router.delete("/customers/:customerId/orders",  (req,res,next) => {
    res.status(200).json(data);
  })
  router.post("/customers/:customerId/orders",  (req,res,next) => {
    res.status(200).json(data);
  })
  router.put("/customers/:customerId/orders",  (req,res,next) => {
    res.status(200).json(data);
  })

  router.get("/customers/:customerId/orders/:orderId",  (req,res,next) => {
    res.status(200).json(data);
  })

  router.put("/customers/:customerId/orders/:orderId",  (req,res,next) => {
    res.status(200).json(data);
  })

  router.delete("/customers/:customerId/orders/:orderId",  (req,res,next) => {
    res.status(200).json(data);
  })