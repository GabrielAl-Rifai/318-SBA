const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const ejs = require("ejs");

const users = require("./routes/users");
const climbs = require("./routes/climbs");
const rating = require("./routes/rating");

const error = require("./utilities/error");

const app = express();
const port = 3000;

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set up the views directory
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/users", users);
app.use("/api/climbs", climbs);
app.use("/api/rating", rating);

// Route for retrieving users with optional query parameters for filtering
app.get("/api/users", (req, res, next) => {
  let filteredUsers = users;

  // Filter users based on query parameters
  if (req.query.name) {
    filteredUsers = filteredUsers.filter(
      (user) => user.name === req.query.name
    );
  }

  res.json({ users: filteredUsers });
});

// Route for retrieving climbs with optional query parameters for filtering
app.get("/api/climbs", (req, res, next) => {
  // Retrieve climbs from database or data source
  let filteredClimbs = climbs;

  // Filter climbs based on query parameters
  if (req.query.location) {
    filteredClimbs = filteredClimbs.filter(
      (climb) => climb.location === req.query.location
    );
  }

  res.json({ climbs: filteredClimbs });
});

// Render climbs view
app.get("/climbs", (req, res) => {
  res.render("climbs", { climbs: climbs });
});

// Default route
app.get("/", (req, res) => {
  res.json({ links: [{ href: "/api", rel: "api", type: "GET" }] });
});

// API endpoint descriptions
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
        description: "Get all users with optional filtering by name",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
        description: "Create a new user",
      },
      {
        href: "api/climbs",
        rel: "climbs",
        type: "GET",
        description: "Get all climbs with optional filtering by location",
      },
      {
        href: "api/climbs",
        rel: "climbs",
        type: "POST",
        description: "Create a new climb",
      },
    ],
  });
});

// 404 middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
console.log(`C'mon!TEXAS!CLIMBS!`);
