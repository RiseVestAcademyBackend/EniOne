const express = require("express");
const router = express.Router();

const Apartments = [
  { ApartmentId: 1, name: "Sunset Villas", TenantIds: [1, 2] },
  { ApartmentId: 2, name: "Greenwood Heights", TenantIds: [3] },
  { ApartmentId: 3, name: "Downtown Residences", TenantIds: [4, 5] },
];

const Tenants = [
  { TenantId: 1, name: "John Doe", age: 30 },
  { TenantId: 2, name: "Jane Smith", age: 25 },
  { TenantId: 3, name: "Alice Johnson", age: 28 },
  { TenantId: 4, name: "Bob Brown", age: 35 },
  { TenantId: 5, name: "Charlie Green", age: 40 },
];

// Get all apartments
router.get("/", (req, res) => {
  res.status(200).json(Apartments);
});

// Get all apartments with their tenant details
router.get("/all", (req, res) => {
  const apartmentsWithTenants = Apartments.map((apartment) => {
    const tenants = apartment.TenantIds.map((tenantId) =>
      Tenants.find((tenant) => tenant.TenantId === tenantId)
    );
    return {
      ApartmentId: apartment.ApartmentId,
      name: apartment.name,
      tenants: tenants,
    };
  });
  res.status(200).json(apartmentsWithTenants);
});

// Add a new apartment
router.post("/new", (req, res) => {
  const newApartment = req.body;
  Apartments.push(newApartment);
  res.status(201).json(newApartment);
});

// Update all apartments
router.put("/update", (req, res) => {
  const updatedApartments = req.body;
  Apartments.splice(0, Apartments.length, ...updatedApartments);
  res.status(200).json(Apartments);
});

// Delete all apartments
router.delete("/delete", (req, res) => {
  Apartments.splice(0, Apartments.length);
  res.status(200).json({ message: "All apartments deleted" });
});

// Get a particular apartment by ApartmentId
router.get("/:ApartmentId", (req, res) => {
  const ApartmentId = parseInt(req.params.ApartmentId);
  const apartment = Apartments.find((a) => a.ApartmentId === ApartmentId);
  if (apartment) {
    res.status(200).json(apartment);
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// Edit a particular apartment by ApartmentId
router.put("/:ApartmentId", (req, res) => {
  const ApartmentId = parseInt(req.params.ApartmentId);
  const updatedApartment = req.body;
  const index = Apartments.findIndex((a) => a.ApartmentId === ApartmentId);
  if (index !== -1) {
    Apartments[index] = { ...Apartments[index], ...updatedApartment };
    res.status(200).json(Apartments[index]);
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// Delete a particular apartment by ApartmentId
router.delete("/:ApartmentId", (req, res) => {
  const ApartmentId = parseInt(req.params.ApartmentId);
  const index = Apartments.findIndex((a) => a.ApartmentId === ApartmentId);
  if (index !== -1) {
    Apartments.splice(index, 1);
    res.status(200).json({ message: "Apartment deleted" });
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// Get all tenants for a particular apartment
router.get("/:ApartmentId/tenants", (req, res) => {
  const ApartmentId = parseInt(req.params.ApartmentId);
  const apartment = Apartments.find((a) => a.ApartmentId === ApartmentId);
  if (apartment) {
    const tenants = apartment.TenantIds.map((id) => Tenants.find((t) => t.TenantId === id));
    res.status(200).json(tenants);
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// Add a tenant to an apartment
router.post("/:ApartmentId/tenants", (req, res) => {
  const ApartmentId = parseInt(req.params.ApartmentId);
  const TenantId = req.body.TenantId;
  const apartment = Apartments.find((a) => a.ApartmentId === ApartmentId);
  if (apartment) {
    apartment.TenantIds.push(TenantId);
    res.status(201).json(apartment);
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// Remove a tenant from an apartment
router.delete("/:ApartmentId/tenants/:TenantId", (req, res) => {
  const ApartmentId = parseInt(req.params.ApartmentId);
  const TenantId = parseInt(req.params.TenantId);
  const apartment = Apartments.find((a) => a.ApartmentId === ApartmentId);
  if (apartment) {
    apartment.TenantIds = apartment.TenantIds.filter((id) => id !== TenantId);
    res.status(200).json({ message: "Tenant removed from apartment" });
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// Get all tenants
router.get("/tenants", (req, res) => {
  res.status(200).json(Tenants);
});

// Add a new tenant
router.post("/tenants", (req, res) => {
  const newTenant = req.body;
  Tenants.push(newTenant);
  res.status(201).json(newTenant);
});

// Delete a tenant by TenantId
router.delete("/tenants/:TenantId", (req, res) => {
  const TenantId = parseInt(req.params.TenantId);
  const index = Tenants.findIndex((t) => t.TenantId === TenantId);
  if (index !== -1) {
    Tenants.splice(index, 1);
    res.status(200).json({ message: "Tenant deleted" });
  } else {
    res.status(404).json({ message: "Tenant not found" });
  }
});

module.exports = router;
