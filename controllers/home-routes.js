// mvc | view routes
const router = require('express').Router();

// renders the frontend homepage template
router.get('/', (req, res) => {
    res.render('homepage');
});

module.exports = router;