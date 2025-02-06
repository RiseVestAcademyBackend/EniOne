const express = require("express");
const router = express.Router();

const Restaurants = [
  { RestaurantId: 1, name: "The Nigerian Feast", MenuItemIds: [1, 2, 3] },
  { RestaurantId: 2, name: "Suya Express", MenuItemIds: [4, 5, 6] },
  { RestaurantId: 3, name: "Jollof Corner", MenuItemIds: [7, 8, 9] },
  { RestaurantId: 4, name: "Iyan & Egusi House", MenuItemIds: [10, 11] },
  { RestaurantId: 5, name: "Fried Rice Palace", MenuItemIds: [12, 13, 14] },
];

const MenuItems = [
  { MenuItemId: 1, MenuItemName: "Jollof Rice", Price: 2500 },
  { MenuItemId: 2, MenuItemName: "Pounded Yam & Egusi Soup", Price: 5600 },
  { MenuItemId: 3, MenuItemName: "Efo Riro (Spinach Stew)", Price: 3500 },
  { MenuItemId: 4, MenuItemName: "Suya (Grilled Meat)", Price: 5000 },
  { MenuItemId: 5, MenuItemName: "Kilishi", Price: 4000 },
  { MenuItemId: 6, MenuItemName: "Shawarma (Bistro style)", Price: 7000 },
  { MenuItemId: 7, MenuItemName: "Porridge Yam", Price: 5000 },
  { MenuItemId: 8, MenuItemName: "Pepper Soup (Goat Meat)", Price: 8000 },
  { MenuItemId: 9, MenuItemName: "Nkwobi", Price: 12000 },
  { MenuItemId: 10, MenuItemName: "Iyan & Egusi Soup", Price: 11000 },
  { MenuItemId: 11, MenuItemName: "Ofada Rice & Ayamase Stew", Price: 6000 },
  { MenuItemId: 12, MenuItemName: "Fried Rice", Price: 3000 },
  { MenuItemId: 13, MenuItemName: "Moi Moi", Price: 900 },
  { MenuItemId: 14, MenuItemName: "Beans & Plantain", Price: 3000 },
];

// Get all restaurants
router.get("/", (req, res) => {
  res.status(200).json(Restaurants);
});
// Get all restaurants with their menu details (excluding MenuItemId)
router.get("/all", (req, res) => {
  const restaurantsWithMenu = Restaurants.map((restaurant) => {
    const menuItems = restaurant.MenuItemIds.map((itemId) =>
      MenuItems.find((menuItem) => menuItem.MenuItemId === itemId)
    );
    return {
      RestaurantId: restaurant.RestaurantId,
      name: restaurant.name,
      menu: menuItems.map(({ MenuItemName, Price }) => ({
        MenuItemName,
        Price,
      })),
    };
  });

  res.status(200).json(restaurantsWithMenu);
});

// Add a new restaurant
router.post("/new", (req, res) => {
  const newRestaurant = req.body;
  Restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
});

// Update all restaurants
router.put("/update", (req, res) => {
  const updatedRestaurants = req.body;
  console.log(updatedRestaurants);
  Restaurants.splice(0, Restaurants.length, ...updatedRestaurants);
  res.status(200).json(Restaurants);
});

// Delete all restaurants
router.delete("/delete", (req, res) => {
  Restaurants.splice(0, Restaurants.length);
  res.status(200).json({ message: "All restaurants deleted" });
});

// Get a particular restaurant by id
router.get("/:id", (req, res) => {
  const RestaurantId = parseInt(req.params.RestaurantId);
  const restaurant = Restaurants.find((r) => r.RestaurantId === RestaurantId);
  if (restaurant) {
    res.status(200).json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Edit a particular restaurant by id
router.put("/:id", (req, res) => {
  const RestaurantId = parseInt(req.params.RestaurantId);
  const updatedRestaurant = req.body;
  const index = Restaurants.findIndex((r) => r.RestaurantId === RestaurantId);
  if (index !== -1) {
    Restaurants[index] = { ...Restaurants[index], ...updatedRestaurant };
    res.status(200).json(Restaurants[index]);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Delete a particular restaurant by id
router.delete("/:id", (req, res) => {
  const RestaurantId = parseInt(req.params.RestaurantId);
  const index = Restaurants.findIndex((r) => r.RestaurantId === RestaurantId);
  if (index !== -1) {
    Restaurants.splice(index, 1);
    res.status(200).json({ message: "Restaurant deleted" });
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Get all menu items for a particular restaurant
router.get("/:id/menu-items", (req, res) => {
  const RestaurantId = parseInt(req.params.RestaurantId);
  const restaurant = Restaurants.find((r) => r.RestaurantId === RestaurantId);
  if (restaurant) {
    const menuItems = restaurant.MenuItemIds.map((itemId) =>
      MenuItems.find((m) => m.MenuItemId === itemId)
    );
    res.status(200).json(menuItems);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Add a menu item to a restaurant
router.post("/:id/menu-items", (req, res) => {
  const RestaurantId = parseInt(req.params.RestaurantId);
  const menuItemId = req.body.MenuItemId;
  const restaurant = Restaurants.find((r) => r.RestaurantId === RestaurantId);
  if (restaurant) {
    restaurant.MenuItemIds.push(menuItemId);
    res.status(201).json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Update a menu item for a specific restaurant
router.put("/:id/menu-items/:MenuItemId", (req, res) => {
  const RestaurantId = parseInt(req.params.RestaurantId);
  const MenuItemId = parseInt(req.params.MenuItemId);
  const newMenuItemId = req.body.MenuItemId;
  const restaurant = Restaurants.find((r) => r.RestaurantId === RestaurantId);
  if (restaurant) {
    const index = restaurant.MenuItemIds.indexOf(MenuItemId);
    if (index !== -1) {
      restaurant.MenuItemIds[index] = newMenuItemId;
      res.status(200).json(restaurant);
    } else {
      res
        .status(404)
        .json({ message: "MenuItem not found for this restaurant" });
    }
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Delete a menu item from a restaurant
router.delete("/:id/menu-items/:MenuItemId", (req, res) => {
  const RestaurantId = parseInt(req.params.RestaurantId);
  const MenuItemId = parseInt(req.params.MenuItemId);
  const restaurant = Restaurants.find((r) => r.RestaurantId === RestaurantId);
  if (restaurant) {
    restaurant.MenuItemIds = restaurant.MenuItemIds.filter(
      (id) => id !== MenuItemId
    );
    res.status(200).json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Get all menu items
router.get("/menu-items", (req, res) => {
  res.status(200).json(MenuItems);
});

// Add a new menu item
router.post("/menu-items", (req, res) => {
  const newMenuItem = req.body;
  MenuItems.push(newMenuItem);
  res.status(201).json(newMenuItem);
});

// Update all menu items
router.put("/menu-items", (req, res) => {
  const updatedMenuItems = req.body;
  MenuItems.splice(0, MenuItems.length, ...updatedMenuItems);
  res.status(200).json(MenuItems);
});

// Delete all menu items
router.delete("/menu-items", (req, res) => {
  MenuItems.splice(0, MenuItems.length);
  res.status(200).json({ message: "All menu items deleted" });
});

// Get menu item by id
router.get("/menu-items/:id", (req, res) => {
  const MenuItemId = parseInt(req.params.MenuItemId);
  const menuItem = MenuItems.find((m) => m.MenuItemId === MenuItemId);
  if (menuItem) {
    res.status(200).json(menuItem);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

// Delete a menu item by id
router.delete("/menu-items/:id", (req, res) => {
  const MenuItemId = parseInt(req.params.MenuItemId);
  const index = MenuItems.findIndex((m) => m.MenuItemId === MenuItemId);
  if (index !== -1) {
    MenuItems.splice(index, 1);
    res.status(200).json({ message: "Menu item deleted" });
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

module.exports = router;
