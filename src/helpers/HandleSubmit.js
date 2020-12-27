import { useState } from 'react';

export default function HandleSubmit(event) {
  console.log('look here:', event.target.value)
  event.preventDefault(event);


  // const [isDatetime, setIsDatetime] = useState('');
  // const [isAttendees, setIsAttendees] = useState(0);
  
  // function getDatetime() {
  //   setIsDatetime('')
  // }
  
  // console.log('here is state:', this.isDatetime)
}