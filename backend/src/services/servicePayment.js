const throwError = require('../utilities/throwError');
const statusCode = require('../utilities/statusCodes');
const messagesManager = require('../utilities/messagesManager');

const stripeOBJ = require('stripe');
require('dotenv').config();

const stripe = stripeOBJ(process.env.STRIPE_SECRET_KEY);

async function Payment(priceId) {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment', 
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            success_url: 'http://localhost:5173/paymentsuccess',
            cancel_url: 'http://localhost:5173/paymentfail',
        });

        return { url: session.url };
    } catch (error) {
        console.error(error);
        throw throwError(messagesManager.Error('paymentFail'), statusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = { Payment };