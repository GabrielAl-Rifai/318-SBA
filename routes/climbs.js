const express = require("express");
const router = express.Router();

const climbs = require("../data/climbs");
const error = require("../utilities/error");

// Route for rendering the climbs view
router.get("/", (req, res) => {
   // Pass climbs data to the template
  res.render("climbs", { climbs: climbs });
});

// Route for handling GET and POST requests for /climbs
router
  .route("/")
  .get((req, res) => {
    // Endpoint to retrieve all climbs
    const links = [
      {
        href: "climbs/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ climbs, links });
  })

  .post((req, res, next) => {
    // Endpoint to add a new climb
    if (req.body.userId && req.body.title && req.body.content) {
      // Creating a new climb object
      const newClimb = {
        id: climbs[climbs.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      // Adding the new climb to the climbs array
      climbs.push(newClimb);
      res.json(climbs[climbs.length - 1]);
    } else {
      // If insufficient data is provided, return an error
      next(error(400, "Insufficient Data"));
    }
  });

// Route for handling GET, PATCH, and DELETE requests for a specific climb by ID
router
  .route("/:id")
  .get((req, res, next) => {
    // Endpoint to retrieve a specific climb by ID
    const climb = climbs.find((c) => c.id == req.params.id);

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

    if (climb) {
      res.json({ climb, links });
    } else {
      next();
    }
  })
  .patch((req, res, next) => {
    // Endpoint to update a specific climb by ID
    const climbIndex = climbs.findIndex((c) => c.id == req.params.id);

    if (climbIndex !== -1) {
      // If climb found, update its properties with new data
      for (const key in req.body) {
        climbs[climbIndex][key] = req.body[key];
      }
      res.json(climbs[climbIndex]);
    } else {
      next();
    }
  })
  .delete((req, res, next) => {
    // Endpoint to delete a specific climb by ID
    const climbIndex = climbs.findIndex((c) => c.id == req.params.id);

    if (climbIndex !== -1) {
      // If climb found, delete it from the climbs array
      const deletedClimb = climbs.splice(climbIndex, 1);
      res.json(deletedClimb[0]);
    } else {
      next();
    }
  });

module.exports = router;
