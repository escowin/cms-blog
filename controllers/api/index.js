const router = require('express').Router();
const userRoutes = require('./user-routes');
const journalRoutes = require('./journal-routes');
// const entryRoutes = require('./entry-routes');

// api endpoints | /api/<route name>
router.use('/users', userRoutes)
router.use('/journals', journalRoutes);
// router.use('/entries', entryRoutes);

module.exports = router;