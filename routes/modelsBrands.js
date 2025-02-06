const express = require("express");
const router = express.Router();

const Models = [
    { ModelId: 1, name: "Gigi Hadid", BrandIds: [3, 10] }, 
    { ModelId: 2, name: "Noah Mills", BrandIds: [6] },     
    { ModelId: 3, name: "Cara Delevingne", BrandIds: [8] }, 
    { ModelId: 4, name: "Tyson Beckford", BrandIds: [7] },  
    { ModelId: 5, name: "Adut Akech", BrandIds: [9] },      
    { ModelId: 6, name: "David Gandy", BrandIds: [5] },     
    { ModelId: 7, name: "Anok Yai", BrandIds: [4] },        
    { ModelId: 8, name: "Liu Wen", BrandIds: [10] },        
    { ModelId: 9, name: "Brad Kroenig", BrandIds: [2] },    
    { ModelId: 10, name: "Naomi Campbell", BrandIds: [1] }  
  ];
  
  const Brands = [
    { BrandId: 1, BrandName: "Chanel" },
    { BrandId: 2, BrandName: "Gucci" },
    { BrandId: 3, BrandName: "Louis Vuitton" },
    { BrandId: 4, BrandName: "Christian Dior" },
    { BrandId: 5, BrandName: "Hermes" },
    { BrandId: 6, BrandName: "Prada" },
    { BrandId: 7, BrandName: "Yves Saint Laurent" },
    { BrandId: 8, BrandName: "Alexander McQueen" },
    { BrandId: 9, BrandName: "Robert Wun" },
    { BrandId: 10, BrandName: "Fendi" }
  ];

//    return all models information
  router.get("/models", (req, res) => {
    res.status(200).json(Models);
  });

  // add a new model
  router.post("/models", (req, res) => {
    const newModel = req.body; // { ModelId, name, BrandIds }
    Models.push(newModel);
    res.status(201).json(newModel);
  });
  
  // effect change on all rows in your table
  router.put("/models", (req, res) => {
    const updatedModels = req.body;
    Models.splice(0, Models.length, ...updatedModels);
    res.status(200).json(Models);
  });
  
  // delete the entire table
  router.delete("/models", (req, res) => {
    Models.splice(0, Models.length); 
    res.status(200).json({ message: "All models deleted" });
  });
  
  // get a particular model given their id
  router.get("/models/:ModelId", (req, res) => {
    const ModelId = parseInt(req.params.ModelId);
    const model = Models.find(m => m.ModelId === ModelId);
    if (model) {
      res.status(200).json(model);
    } else {
      res.status(404).json({ message: "Model not found" });
    }
  });

  // edit a particular model given their id
  router.put("/models/:ModelId", (req, res) => {
    const ModelId = parseInt(req.params.ModelId);
    const updatedModel = req.body; // { name, BrandIds }
    const index = Models.findIndex(m => m.ModelId === ModelId);
    if (index !== -1) {
      Models[index] = { ...Models[index], ...updatedModel };
      res.status(200).json(Models[index]);
    } else {
      res.status(404).json({ message: "Model not found" });
    }
  });

   // delete a particular model given their id
   router.delete("/models/:ModelId", (req, res) => {
    const ModelId = parseInt(req.params.ModelId);
    const index = Models.findIndex(m => m.ModelId === ModelId);
    if (index !== -1) {
      Models.splice(index, 1);
      res.status(200).json({ message: "Model deleted" });
    } else {
      res.status(404).json({ message: "Model not found" });
    }
  });

  // get all Brands for a particular model
  router.get("/models/:ModelId/brands", (req, res) => {
    const ModelId = parseInt(req.params.ModelId);
    const model = Models.find(m => m.ModelId === ModelId);
    if (model) {
      const brands = model.BrandIds.map(brandId => 
        Brands.find(b => b.BrandId === brandId)
      );
      res.status(200).json(brands);
    } else {
      res.status(404).json({ message: "Model not found" });
    }
  });

  // add brand to a particular model
  router.post("/models/:ModelId/brands", (req, res) => {
    const ModelId = parseInt(req.params.ModelId);
    const brandId = req.body.BrandId; // { BrandId }
    const model = Models.find(m => m.ModelId === ModelId);
    if (model) {
      model.BrandIds.push(brandId);
      res.status(201).json(model);
    } else {
      res.status(404).json({ message: "Model not found" });
    }
  });

  // update a brand for a specific model
  router.put("/models/:ModelId/brands/:BrandId", (req, res) => {
    const ModelId = parseInt(req.params.ModelId);
    const BrandId = parseInt(req.params.BrandId);
    const newBrandId = req.body.BrandId; //{ BrandId }
    const model = Models.find(m => m.ModelId === ModelId);
    if (model) {
      const index = model.BrandIds.indexOf(BrandId);
      if (index !== -1) {
        model.BrandIds[index] = newBrandId;
        res.status(200).json(model);
      } else {
        res.status(404).json({ message: "Brand not found for this model" });
      }
    } else {
      res.status(404).json({ message: "Model not found" });
    }
  });

  // delete a praticular models brand
  router.delete("/models/:ModelId/brands/:BrandId", (req, res) => {
    const ModelId = parseInt(req.params.ModelId);
    const BrandId = parseInt(req.params.BrandId);
    const model = Models.find(m => m.ModelId === ModelId);
    if (model) {
      model.BrandIds = model.BrandIds.filter(id => id !== BrandId);
      res.status(200).json(model);
    } else {
      res.status(404).json({ message: "Model not found" });
    }
  });

  // get all brands
  router.get("/brands", (req, res) => {
    res.status(200).json(Brands);
  });

  // add  a new brand
  router.post("/brands", (req, res) => {
    const newBrand = req.body; // { BrandId, BrandName }
    Brands.push(newBrand);
    res.status(201).json(newBrand);
  });
  
  //update all brands
  router.put("/brands", (req, res) => {
    const updatedBrands = req.body; // an array of updated brands
    Brands.splice(0, Brands.length, ...updatedBrands); 
    res.status(200).json(Brands);
  });

  // delete all brands
  router.delete("/brands", (req, res) => {
    Brands.splice(0, Brands.length); // Clear the Brands array
    res.status(200).json({ message: "All brands deleted" });
  });

  //get brand by id
  router.get("/brands/:BrandId", (req, res) => {
    const BrandId = parseInt(req.params.BrandId);
    const brand = Brands.find(b => b.BrandId === BrandId);
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  });

  //update specific brand by id
  router.get("/brands/:BrandId", (req, res) => {
    const BrandId = parseInt(req.params.BrandId);
    const brand = Brands.find(b => b.BrandId === BrandId);
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  });

  // delete specific brand by id
  router.delete("/brands/:BrandId", (req, res) => {
    const BrandId = parseInt(req.params.BrandId);
    const index = Brands.findIndex(b => b.BrandId === BrandId);
    if (index !== -1) {
      Brands.splice(index, 1);
      res.status(200).json({ message: "Brand deleted" });
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  });

module.exports = router;