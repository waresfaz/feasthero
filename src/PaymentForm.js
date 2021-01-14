

export default function BookingForm(props) {

  const handleSubmit = event => {
    event.preventDefault();
    console.log('logged!')
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div>
        <input type="text" className="first-name" placeholder="First Name" />
        <input type="text" className="last-name" placeholder="Last Name"/>
        <input type="text" className="company-name" placeholder="Company Name" />
        <input type="email" className="email-address" placeholder="Email Address"/>

        {/* pass in cost + number of people and show the total price. */}
        <h2>Total cost: ${props.cost}</h2>
      </div>
      
      {/* Pay Button */}
      <input type="submit" className="submit-payment-form" value="Pay" />
    </form>
  )
}