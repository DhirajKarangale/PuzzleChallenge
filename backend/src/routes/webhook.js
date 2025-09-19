const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const modelUser = require('../model/modelUser');

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET // from Stripe Dashboard
        );
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const userId = session.metadata.userId; // 👈 comes from metadata
        if (userId) {
            // Increment entriescount
            await modelUser.UpdateUser(
                ['entriescount = entriescount + 1'],
                1,
                [userId]
            );
            console.log(`✅ entriescount incremented for user ${userId}`);
        }
    }

    res.json({ received: true });
});

module.exports = router;