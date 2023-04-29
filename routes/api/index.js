const router = require("express").Router();
const journalRoutes = require("./journal-routes");

// restful api endpoints
router.use('/journals', journalRoutes);

module.exports = router;