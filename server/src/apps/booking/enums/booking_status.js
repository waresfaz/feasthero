const BookingStatusEnum = Object.freeze({'cancelled': 1, 'failed': 2, 'success': 3});

function stringFromBookingStatus(status) {
    switch (status) {
        case 1:
            return 'cancelled'
        case 2:
            return 'failed'
        case 3:
            return 'success'
    }
}

module.exports = { BookingStatusEnum, stringFromBookingStatus };