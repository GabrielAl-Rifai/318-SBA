const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const climbs = require("./routes/climbs");
// const rating = require("./routes/rating");

const error = require("./utilities/error");

const app = express();
const port = 3000;

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Routes
app.use("/api/users", users);
app.use("/api/climbs", climbs);
// app.use("/api/rating", rating);

app.get("/", (req, res) => {
  res.json({ links: [{ href: "/api", rel: "api", type: "GET" }] });
});

app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/climbs",
        rel: "climbs",
        type: "GET",
      },
      {
        href: "api/climbs",
        rel: "climbs",
        type: "POST",
      },
      {
        href: "api/rating",
        rel: "rating",
        type: "GET",
      },
      {
        href: "api/rating",
        rel: "rating",
        type: "POST",
      },
    ],
  });
});

// 404 middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// error-handling middleware

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
console.log(`C'mon!TEXAS!CLIMBS!`);
