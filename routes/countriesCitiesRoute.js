const express = require("express");
const countriesRouter = express.Router();

let cities = [
  { id: 1, city: "La Paz", country_id: 1 },
  { id: 2, city: "Baru", country_id: 2 },
  { id: 3, city: "Del Pilar", country_id: 3 },
  { id: 4, city: "Futu", country_id: 4 },
  { id: 5, city: "Pulorejo", country_id: 5 },
  { id: 6, city: "Larnaca", country_id: 6 },
  { id: 7, city: "Hino", country_id: 7 },
  { id: 8, city: "Cikalong", country_id: 8 },
  { id: 9, city: "Chernogorsk", country_id: 9 },
  { id: 10, city: "Pimian", country_id: 10 },
  { id: 11, city: "Kiel", country_id: 1 },
  { id: 12, city: "Río Alejandro", country_id: 2 },
  { id: 13, city: "Étampes", country_id: 3 },
  { id: 14, city: "Takedamachi", country_id: 4 },
  { id: 15, city: "Nonoichi", country_id: 5 },
  { id: 16, city: "Irvine", country_id: 6 },
  { id: 17, city: "Montpellier", country_id: 7 },
  { id: 18, city: "Villefranche-sur-Mer", country_id: 8 },
  { id: 19, city: "Staryy Merchyk", country_id: 9 },
  { id: 20, city: "Škofljica", country_id: 10 },
];

let countries = [
  { id: 1, country: "Philippines" },
  { id: 2, country: "China" },
  { id: 3, country: "Serbia" },
  { id: 4, country: "Palestinian Territory" },
  { id: 5, country: "Russia" },
  { id: 6, country: "Indonesia" },
  { id: 7, country: "Lithuania" },
  { id: 8, country: "China" },
  { id: 9, country: "Zimbabwe" },
  { id: 10, country: "Indonesia" },
];

// Adds a new country
countriesRouter.post("/", (req, res, next) => {
  const { name: country } = req.body;
  const id = countries[countries.length - 1].id + 1; // Set new id as last_id + 1

  const data = { country, id };
  countries.push(data);

  res.status(201).json(data);
});

// Fetches the list of all countries
countriesRouter.get("/", (req, res, next) => {
  res.json(countries);
});

// Updates entire list of countries
countriesRouter.put("/", (req, res, next) => {
  const { countries: n_countries } = req.body;

  const isCountriesValid =
    Array.isArray(n_countries) &&
    n_countries.every(
      (x) =>
        typeof x === "object" &&
        !Array.isArray(x) &&
        x !== null &&
        x.id &&
        x.country
    );

  if (!isCountriesValid)
    res
      .status(400)
      .json({ error: "countries must be an array of objects {id, country}" });
  else {
    countries = n_countries;

    res.json({ message: "Coountries array updated successfully", data: countries });
  }
});

// Deletes all countries
countriesRouter.delete("/", (req, res, next) => {
  countries = [];

  res.json({ message: "All countries deleted successfully", data: countries });
});

// Fetches a single country
countriesRouter.get("/:id", (req, res, next) => {
  let { id } = req.params;
  id = +id;

  const f_country = countries.find((c) => c.id == id);

  if (f_country === undefined) res.status(404).json({ error: "country id not found" });
  else res.json(f_country);
});

// Updates a country record
countriesRouter.put("/:id", (req, res, next) => {
  let { id } = req.params;
  id = +id;

  const { name } = req.body;

  const f_country = countries.find((c) => c.id == id);

  if (f_country === undefined) res.status(404).json({ error: "id not found" });
  else if (!(name && typeof name === "string" && name.length >= 4))
    res.status(400).json({ error: "name must be valid" });
  else {
    f_country["country"] = name;
    res.json({ message: "Country updated successfully", data: f_country});
  }
});

// Delete a country record
countriesRouter.delete("/:id", (req, res, next) => {
  let { id } = req.params;
  id = +id;

  const { name } = req.body;
  const idx_country = countries.findIndex((c) => c.id == id);

  if (idx_country === -1)
    res.status(404).json({ error: "country id not found" });
  else {
    countries.splice(idx_country, 1);
    res.json({ message: "Country deleted successfully" });
  }
});

// Fetch list of country's cities
countriesRouter.get("/:countryId/cities", (req, res, next) => {
  let { countryId } = req.params;
  countryId = +countryId;

  const f_cities = cities.filter((city) => city.country_id == countryId);

  res.json(f_cities);
});

// Adds a new city to a country
countriesRouter.post("/:countryId/cities", (req, res, next) => {
  const { name: city } = req.body;
  let { countryId } = req.params;
  countryId = +countryId;

  const f_country = countries.find((c) => c.id == countryId);

  if (f_country === undefined)
    res.status(404).json({ error: "country id not found" });
  else {
    const id = cities[cities.length - 1].id + 1; // Set new id as last_id + 1
    const city_data = { city, id, country_id: countryId };

    cities.push(city_data);
    res.status(201).json(city_data);
  }
});

// Updates all cities for given country
countriesRouter.put("/:countryId/cities", (req, res, next) => {
  let { countryId } = req.params;
  countryId = +countryId;

  const { cities: n_cities } = req.body;

  const f_country = countries.find((c) => c.id == countryId);
  if (f_country === undefined)
    res.status(404).json({ error: "country id not found" });

  const isCitiesValid =
    Array.isArray(n_cities) &&
    n_cities.every(
      (x) =>
        typeof x === "object" &&
        !Array.isArray(x) &&
        x !== null &&
        x.id &&
        x.city &&
        x.country_id === countryId
    );

  if (!isCountriesValid)
    res.status(400).json({
      error: "cities must be an array of objects {id, city, countryId}",
    });
  else {
    [...cities].forEach((x, idx) =>
      x.country_id === countryId ? cities.splice(idx, 1) : null
    ); // Remove existing cities

    cities.push(...n_cities);

    countries = n_countries;

    res.json({ message: "Coountries array updated successfully" });
  }
});

// Deletes the entire cities for a given country
countriesRouter.delete("/:countryId/cities", (req, res, next) => {
  let { countryId } = req.params;
  countryId = +countryId;

  const f_country = countries.find((c) => c.id == countryId);
  if (f_country === undefined)
    res.status(404).json({ error: "country id not found" });

  [...cities].forEach((x, idx) =>
    x.country_id === countryId ? cities.splice(idx, 1) : null
  ); // Remove existing cities

  res.json({ message: "Cities deleted" });
});

// Fetch a specific city from a country
countriesRouter.get("/:countryId/cities/:cityId", (req, res, next) => {
  let { countryId, cityId } = req.params;
  countryId = +countryId;
  cityId = +cityId;

  const f_city = cities.find(
    (ct) => ct.id == cityId && ct.country_id === countryId
  );
  if (f_city === undefined) res.status(404).json({ error: "City not found" });

  res.json(f_city);
});

// Updates a city's name
countriesRouter.put("/:countryId/cities/:cityId", (req, res, next) => {
  let { countryId, cityId } = req.params;
  let { name } = req.body;

  countryId = +countryId;
  cityId = +cityId;

  const f_city = cities.find(
    (ct) => ct.id == cityId && ct.country_id === countryId
  );
  if (f_city === undefined) res.status(404).json({ error: "City not found" });

  f_city.city = name;
  res.json({ f_city });
});

// Delete a city
countriesRouter.delete("/:countryId/cities/:cityId", (req, res, next) => {
  let { countryId, cityId } = req.params;
  let { name } = req.body;

  countryId = +countryId;
  cityId = +cityId;

  const f_city_idx = cities.findIndex(
    (ct) => ct.id == cityId && ct.country_id === countryId
  );
  if (f_city_idx === -1) res.status(404).json({ error: "City not found" });

  cities.splice(f_city_idx, 1);
  res.status(200).json({ message: "City deleted successfully" });
});

module.exports = countriesRouter;
