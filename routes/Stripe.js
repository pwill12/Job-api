require("dotenv").config()
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY)
    // const cors = require("cors")

router.post("/payment", async(req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.charges.create({
                amount,
                currency: "USD",
                description: "Will",
                payment_method: id,
                // confirm: true
            })
            // console.log("Payment", payment)
            // res.json({
            //     message: "Payment successful",
            //     success: true
            // })
        if (res.statusCode === 200) {
            res.json(payment)
        } else {
            res.json('not found')
        }
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }

    // stripe.charges.create({
    //         amount,
    //         payment_id: id,
    //         //   amount: req.body.amount,
    //         currency: "usd",
    //     },
    //     (stripeErr, stripeRes) => {
    //         if (stripeErr) {
    //             res.status(500).json(stripeErr);
    //         } else {
    //             res.status(200).json(stripeRes);
    //         }
    //     }
    // );
})

module.exports = router