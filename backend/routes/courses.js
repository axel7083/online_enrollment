const router = require('express').Router();

router.route('/').get((req, res) => {
    res.json("Hello world");
});

module.exports = router;
