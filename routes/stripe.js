const router = require("express").Router();
const KEY = 'sk_test_51KiEf9CQ3BVs6KTdPNye8eURQw3Pfp1rSzL9D3mHT5vIM4iuFkHKVnRa2YVRWNxVgF0iWE1FCL13Qd1m3ChB3bf100NtPwXWLg'
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {


  console.log("Body is>>>",Math.round(req.body.amount))
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: Math.round(req.body.amount),
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        //console.log("Stripe Error>>>",stripeErr);
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;