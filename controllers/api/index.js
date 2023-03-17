const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// api endpoints | /api/<route name>
router.use('/users', userRoutes)
router.use('/journals', postRoutes);
router.use('/logs', commentRoutes);

module.exports = router;