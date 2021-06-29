import { useState } from "react";
import scheduleHelper from "./ScheduleHelper";

// const formReducer = (state, event) => {
//   console.log('this is the state:', state)
//   return {
//     ...state,
//     [event.name]: event.value
//   }
//  }

export default function HandleSubmit(event) {
  // const [formData, setFormData] = useState({})
  const [bookingSize, setBookingSize] = useState(0);

  event.preventDefault(event);
  // alert('Form has been submited')
  // setSubmitting(true);
  console.log("this si event.target:", event);
  console.log("this si event.target new1:", event.target.value);
  console.log("this si event.target new2:", event.target[0]);

  const handleChange = (event) => {
    setBookingSize(event.target.value);
  };

  return (
    <input
      onChange={handleChange}
      type="number"
      className="booking-size"
      min="8"
      max="20"
      placeholder="Limit 8-20"
      required
    />
  );
  //  const handleChange = event => {
  //    console.log('HANDLE CHANGE TRIGGERED')
  //   setFormData({
  //     name: event.target.name,
  //     value: event.target.value,
  //   });
  // }
  // return formData
}
