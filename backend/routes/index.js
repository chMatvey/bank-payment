const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
  res.status(200).send({
    cardNumber: req.body.cardNumber,
    sum: req.body.sum,
    currency: req.body.currency,
    date: new Date()
  });
});

module.exports = router;
