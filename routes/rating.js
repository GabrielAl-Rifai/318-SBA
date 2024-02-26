const express = require("express");
const router = express.Router();

let ratings = [
  {
    id: 1,
    climbId: 1,
    userId: 1,
    rating: 4,
  },
  {
    id: 2,
    climbId: 2,
    userId: 2,
    rating: 5,
  },
];

const error = require("../utilities/error");

// Route for handling GET and POST requests for /ratings
router
  .route("/")
  .get((req, res) => {
    // Endpoint to retrieve all ratings
    const links = [
      {
        href: "ratings/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ ratings, links });
  })
  .post((req, res, next) => {
    // Endpoint to add a new rating
    if (req.body.climbId && req.body.userId && req.body.rating) {
      // Check if the rating for this climb by this user already exists
      const existingRating = ratings.find(
        (r) => r.climbId === req.body.climbId && r.userId === req.body.userId
      );

      if (existingRating) {
        next(error(409, "Rating Already Exists"));
      }

      // Creating a new rating object
      const newRating = {
        id: ratings.length + 1,
        climbId: req.body.climbId,
        userId: req.body.userId,
        rating: req.body.rating,
      };

      // Adding the new rating to the ratings array
      ratings.push(newRating);
      res.json(newRating);
    } else {
      // If insufficient data is provided, return an error
      next(error(400, "Insufficient Data"));
    }
  });

// Route for handling GET and DELETE requests for a specific rating by ID
router
  .route("/:id")
  .get((req, res, next) => {
    // Endpoint to retrieve a specific rating by ID
    const rating = ratings.find((r) => r.id == req.params.id);

    if (rating) {
      res.json(rating);
    } else {
      next();
    }
  })
  .delete((req, res, next) => {
    // Endpoint to delete a specific rating by ID
    const index = ratings.findIndex((r) => r.id == req.params.id);

    if (index !== -1) {
      // If rating found, delete it and return the deleted rating
      const deletedRating = ratings.splice(index, 1);
      res.json(deletedRating[0]);
    } else {
      // If rating not found, move to the next middleware
      next();
    }
  });

module.exports = router;
