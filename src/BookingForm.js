import { useState } from 'react';
import scheduleHelper from './helpers/ScheduleHelper'

export default function BookingForm({schedule, cost}) {
  const [bookingInfo, setBookingInfo] = useState({
    bookingSize : 0,
    bookingDatetime : '',
    cost
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

  const totalCost = function() {
    return cost * bookingInfo.bookingSize
  }

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="booking-input-section">
        <h4>How many people are you booking for?</h4>
        <input onChange={handleChange} name="bookingSize" type="number" id="booking-size-input" className="booking-input" min="8" max="20" placeholder="8-20" required />
      </div>

      <div className="booking-input-section">
        <h4>Select a booking date &amp; time:</h4>
        <select onChange={handleChange} name="bookingDatetime" id="booking-datetime-input" className="booking-input" required>
          {scheduleHelper(schedule)}
        </select>
      </div>

      <input type="text" className="first-name" placeholder="First Name" required />
      <input type="text" className="last-name" placeholder="Last Name" required />
      <input type="text" className="company-name" placeholder="Company Name" required />
      <input type="email" className="email-address" placeholder="Email Address" required />

      <h2>Total cost: ${totalCost()}</h2>

      <input type="submit" className="submit-booking-form" value="Proceed to Payment" />

    </form>
  )
}