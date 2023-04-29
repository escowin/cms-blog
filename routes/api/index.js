const router = require("express").Router();
const userRoutes = require("./user-routes");
const journalRoutes = require("./journal-routes");
const entryRoutes = require("./entry-routes");
const tagRoutes = require("./tag-routes");

// restful api endpoints
router.use("/users", userRoutes);
router.use("/journals", journalRoutes);
router.use("/entries", entryRoutes);
router.use("/tags", tagRoutes);

module.exports = router;
