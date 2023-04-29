const router = require('express').Router();
const userRoutes = require('./user-controllers');
const journalRoutes = require('./journal-controllers');
const entryRoutes = require('./entry-controllers');
// const tagRoutes = require('./tag-routes');

// api endpoints | /api/<route name>
router.use('/users', userRoutes)
router.use('/journals', journalRoutes);
router.use('/entries', entryRoutes);
// router.use('/tags', tagRoutes);

module.exports = router;