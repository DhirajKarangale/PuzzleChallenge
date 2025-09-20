// routes/webhook.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const modelUser = require('../model/modelUser');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    console.log('------------ Webhook received');

    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,                      // must be raw Buffer
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Branch by event type
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        if (userId) {
            await modelUser.IncrementEntries(userId);
            console.log(`✅ Incremented entriescount for user ${userId}`);
        }
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

module.exports = router;