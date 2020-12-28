
export default function scheduleHelper(array){
  let datetimesArray = [];
    for (let elem of array){
      // console.log(elem) // next steps: find out what to replace console.log with)
      if (elem.time.length > 1) {
        // console.log(`${elem.date}, ${elem.time[0]} EST`)
        for (let time of elem.time) {
          if (time) {
            datetimesArray.push(`${elem.date}, ${time} EST`)
          } 
        }
      } else {
        datetimesArray.push(`${elem.date}, ${elem.time} EST`)
      }
    }

    // console.log('datetimeArray here', datetimesArray)

    const datetimes = datetimesArray.map(datetime => {
      return <option>{datetime}</option>
    })

    return datetimes
}