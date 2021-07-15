const Subscription = require("../schema/subscription");
const StatusCodes = require("http-status-codes");

async function subscribe(req, res) {
    const subscriptionData = req.body;
    const subscription = Subscription(subscriptionData);
    Subscription.find({ email: subscription.email }, function (err, docs) {
        if (docs.length) {
            return res.status(StatusCodes.CONFLICT).json({ response: 'email already exists' });
        } else {
            subscription
                .save()
                .then((subscription) => {
                    return res.status(StatusCodes.OK).json({ response: subscription._id });
                })
                .catch((_) => {
                    return res
                        .status(StatusCodes.BAD_REQUEST)
                        .send({ response: "failed to subscribe" });
                });
        }
    })
}

module.exports = subscribe;