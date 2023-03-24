const router = require('express').Router();
const userRoutes = require('./user-routes');
const journalRoutes = require('./journal-routes');
const entryRoutes = require('./entry-routes');
const tagRoutes = require('./tag-routes');

// api endpoints | /api/<route name>
router.use('/users', userRoutes)
router.use('/journals', journalRoutes);
router.use('/entries', entryRoutes);
router.use('/tags', tagRoutes);

module.exports = router;

// note: reconfigure entries end point. possibly ~/journals/:id/entries/ in a mern iteration
// note: viewing an entry should also display its tags
// note: get tags by all & id