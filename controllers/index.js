const router = require('express').Router();
const apiRoutes = require('./api');

// api endpoint | /api
router.use('/api', apiRoutes);

// handles requests to non-existent endpoints
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;