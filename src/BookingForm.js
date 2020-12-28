import { useState } from 'react';
import scheduleHelper from './helpers/ScheduleHelper'

export default function BookingForm({schedule}) {
  // const handleSubmit = event => {

  // }

  return (
    <form>
      <p>How many people are you booking for?
            <input type="number" className="booking-size" min="8" max="20" placeholder="Limit 8-20" required />
        <select name="bookedTime" className="booking-datetimes" required>
          {scheduleHelper(schedule)}
        </select>
        <input type="submit" className="submit-form" value="Proceed to Payment" />
      </p>
    </form>
  )
}