// query to save booked class data
async function bookClass(req, res) {
    try {
        let requestData = req.body.data;

        // initialising object to store in db
        let bookingInfo = {
            class_id: requestData.class_id,
            customer_email: requestData.customer_email,
            customer_first_name: requestData.customer_first_name,
            customer_last_name: requestData.customer_last_name,
            company_name: requestData.company_name,
            booking_size: requestData.booking_size,
            zoom_link: requestData.chef_zoom_link,
            chef_email: requestData.chef_email,
            has_mealkit: requestData.has_mealkit,
            booking_datetime: moment
                .tz(
                    requestData.booking_datetime,
                    "dddd, MMMM D,YYYY,hh:mm a",
                    "US/Eastern"
                )
                .utc(),
            cost: requestData.cost,
            chef_id: requestData.chef_id,
            booking_status: "progress",
        };

        // checks if the date selected is already booked at concurrent time
        let isBooked = await Schedule.find({
            class_id: ObjectId(bookingInfo.class_id),
            $and: [
                {
                    date: { $gte: new Date(bookingInfo.booking_datetime) },
                },
                {
                    date: {
                        $lt: new Date(moment(bookingInfo.booking_datetime).add(1, "hour")),
                    },
                },
            ],
        });

        if (isBooked[0].available == false) {
            return res.status(200).send({
                error: true,
                data:
                    requestData.booking_datetime +
                    " time slot is unavailable , please select a different slot",
            });
        }

        // if not booked , book the slot
        let BookSlot = await Schedule.updateOne(
            {
                class_id: ObjectId(bookingInfo.class_id),
                $and: [
                    {
                        date: { $gte: new Date(bookingInfo.booking_datetime) },
                    },
                    {
                        date: {
                            $lt: new Date(
                                moment(bookingInfo.booking_datetime).add(1, "hour")
                            ),
                        },
                    },
                ],
            },
            { available: false }
        );

        // insert booking details
        let bookedClass = new Booking(bookingInfo);
        return bookedClass
            .save()
            .then((bookedClass) => {
                return res.status(200).json({ error: false, data: bookedClass._id });
            })
            .catch(async (err) => {
                let BookSlot = await Schedule.updateOne(
                    {
                        class_id: ObjectId(bookingInfo.class_id),
                        $and: [
                            {
                                date: { $gte: new Date(bookingInfo.booking_datetime) },
                            },
                            {
                                date: {
                                    $lt: new Date(
                                        moment(bookingInfo.booking_datetime).add(1, "hour")
                                    ),
                                },
                            },
                        ],
                    },
                    { available: true }
                );
                return res.status(200).send({
                    error: true,
                    data: "Class Booking Failed , please try again",
                });
            });
    } catch (e) {
        return res
            .status(200)
            .send({ error: true, data: "Class Booking Failed , please try again" });
    }
};

module.exports = bookClass;