import { useState } from 'react';
import scheduleHelper from './helpers/ScheduleHelper'

export default function BookingForm({schedule}) {
  const [bookingSize, setBookingSize] = useState({'num': 0})

  const handleSubmit = event => {
    event.preventDefault();
    console.log('this is the state upon form submission:', bookingSize)
    // alert('Form was submitted')
  }

  const handleChange = event => {
    setBookingSize({
      'num' : event.target.value
    })
    console.log("prints state everytime there's a change,", bookingSize)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How many people are you booking for?
        <input onChange={handleChange} type="number" className="booking-size" min="8" max="20" placeholder="Limit 8-20" required />
        <select name="bookedTime" className="booking-datetimes" required>
          {scheduleHelper(schedule)}
        </select>
        <input type="submit" className="submit-form" value="Proceed to Payment" />
      </p>
    </form>
  )
}