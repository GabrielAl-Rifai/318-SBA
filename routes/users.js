const express = require("express");
const router = express.Router();

// Importing user data and error utility
const users = require("../data/users");
const error = require("../utilities/error");

// Route for handling GET and POST requests for /users
router
  .route("/")
  .get((req, res) => {
    // Endpoint to retrieve all users
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ users, links });
  })
  .post((req, res, next) => {
    // Endpoint to add a new user
    if (req.body.name && req.body.username && req.body.email) {
      // Check if the username already exists
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      // Creating a new user object
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      // Adding the new user to the users array
      users.push(user);
      res.json(users[users.length - 1]);
    } else {
      // If insufficient data is provided, return an error
      next(error(400, "Insufficient Data"));
    }
  });

// Route for handling GET, PATCH, and DELETE requests for a specific user by ID
router
  .route("/:id")
  .get((req, res, next) => {
    // Endpoint to retrieve a specific user by ID
    const user = users.find((u) => u.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (user) {
      res.json({ user, links });
    } else {
      next();
    }
  })
  .patch((req, res, next) => {
    // Endpoint to update a specific user by ID
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) {
      res.json(user);
    } else {
      next();
    }
  })
  .delete((req, res, next) => {
    // Endpoint to delete a specific user by ID
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) {
      res.json(user);
    } else {
      next();
    }
  });

module.exports = router;
