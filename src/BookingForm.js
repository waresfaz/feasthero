import { useState } from 'react';
import scheduleHelper from './helpers/ScheduleHelper'

export default function BookingForm({schedule}) {
  const [bookingInfo, setBookingInfo] = useState({
    bookingSize : 0,
    bookingDatetime : ''
  })

  const handleSubmit = event => {
    event.preventDefault();
    console.log('bookingInfo state upon submission:', bookingInfo)
  }

  const handleChange = event => {
    const value = event.target.value;
    setBookingInfo({
      ...bookingInfo,
      [event.target.name] : value
    })
    console.log('bookingInfo state in handleChange:', bookingInfo)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How many people are you booking for?
        <input onChange={handleChange} name="bookingSize" type="number" className="booking-size" min="8" max="20" placeholder="Limit 8-20" required />
        <select onChange={handleChange} name="bookingDatetime" className="booking-datetimes" required>
          {scheduleHelper(schedule)}
        </select>
        <input type="submit" className="submit-form" value="Proceed to Payment" />
      </p>
    </form>
  )
}