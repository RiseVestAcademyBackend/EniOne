const express = require("express");
const router = express.Router();

const Companies = [
  { CompanyId: 1, CompanyName: "Apple", ProductIds: [1, 2] },
  { CompanyId: 2, CompanyName: "Samsung", ProductIds: [3, 4] },
  { CompanyId: 3, CompanyName: "Microsoft", ProductIds: [5, 6] },
  { CompanyId: 4, CompanyName: "Google", ProductIds: [7, 8] },
  { CompanyId: 5, CompanyName: "Sony", ProductIds: [9, 10] }
];

const Products = [
  { ProductId: 1, ProductName: "iPhone" },
  { ProductId: 2, ProductName: "MacBook" },
  { ProductId: 3, ProductName: "Galaxy S" },
  { ProductId: 4, ProductName: "Galaxy Tab" },
  { ProductId: 5, ProductName: "Surface Pro" },
  { ProductId: 6, ProductName: "Xbox" },
  { ProductId: 7, ProductName: "Pixel Phone" },
  { ProductId: 8, ProductName: "Chromebook" },
  { ProductId: 9, ProductName: "PlayStation" },
  { ProductId: 10, ProductName: "Bravia TV" }
];

//returns all company
router.get("/", (req, res) => {
  res.status(200).json(Companies);
});

// Add a new company
router.post("/companies", (req, res) => {
  const newCompany = req.body;
  Companies.push(newCompany);
  res.status(201).json(newCompany);
});

//Edit multiple companies
router.put("/companies", (req, res) => {
  const updatedCompanies = req.body;
  Companies.splice(0, Companies.length, ...updatedCompanies);
  res.status(200).json(Companies);
});

// Delete all companies
router.delete("/companies", (req, res) => {
  Companies.splice(0, Companies.length);
  res.status(200).json({ message: "All companies deleted" });
});

// Get a company by id
router.get("/companies/:CompanyId", (req, res) => {
  const CompanyId = parseInt(req.params.CompanyId);
  const company = Companies.find(c => c.CompanyId === CompanyId);
  if (company) {
    res.status(200).json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Edit a company by id
router.put("/companies/:CompanyId", (req, res) => {
  const CompanyId = parseInt(req.params.CompanyId);
  const updatedCompany = req.body;
  const index = Companies.findIndex(c => c.CompanyId === CompanyId);
  if (index !== -1) {
    Companies[index] = { ...Companies[index], ...updatedCompany };
    res.status(200).json(Companies[index]);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Delete a company by id
router.delete("/companies/:CompanyId", (req, res) => {
  const CompanyId = parseInt(req.params.CompanyId);
  const index = Companies.findIndex(c => c.CompanyId === CompanyId);
  if (index !== -1) {
    Companies.splice(index, 1);
    res.status(200).json({ message: "Company deleted" });
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Get all products for a  company
router.get("/companies/:CompanyId/products", (req, res) => {
  const CompanyId = parseInt(req.params.CompanyId);
  const company = Companies.find(c => c.CompanyId === CompanyId);
  if (company) {
    const products = company.ProductIds.map(productId => 
      Products.find(p => p.ProductId === productId)
    );
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Add product to  company
router.post("/companies/:CompanyId/products", (req, res) => {
  const CompanyId = parseInt(req.params.CompanyId);
  const productId = req.body.ProductId;
  const company = Companies.find(c => c.CompanyId === CompanyId);
  if (company) {
    company.ProductIds.push(productId);
    res.status(201).json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Update a product for a company
router.put("/companies/:CompanyId/products/:ProductId", (req, res) => {
  const CompanyId = parseInt(req.params.CompanyId);
  const ProductId = parseInt(req.params.ProductId);
  const newProductId = req.body.ProductId;
  const company = Companies.find(c => c.CompanyId === CompanyId);
  if (company) {
    const index = company.ProductIds.indexOf(ProductId);
    if (index !== -1) {
      company.ProductIds[index] = newProductId;
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Product not found " });
    }
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Delete a product from a company
router.delete("/companies/:CompanyId/products/:ProductId", (req, res) => {
  const CompanyId = parseInt(req.params.CompanyId);
  const ProductId = parseInt(req.params.ProductId);
  const company = Companies.find(c => c.CompanyId === CompanyId);
  if (company) {
    company.ProductIds = company.ProductIds.filter(id => id !== ProductId);
    res.status(200).json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
});

// Get all products
router.get("/products", (req, res) => {
  res.status(200).json(Products);
});

// Add a new product
router.post("/products", (req, res) => {
  const newProduct = req.body;
  Products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update all products
router.put("/products", (req, res) => {
  const updatedProducts = req.body;
  Products.splice(0, Products.length, ...updatedProducts);
  res.status(200).json(Products);
});


module.exports = router;
