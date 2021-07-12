function reminderToCustomerTemplate(reminderToCustomerData) {
        return `
                <p>Hi <b>${reminderToCustomerData.customerFirstName}</b>, this is a reminder mail about your cooking class scheduled for tomorrow.</p>
                <p>Here’s everything you need to know for your class with <b>${reminderToCustomerData.name}</b>:</p>
                <p>Class name: <b>${reminderToCustomerData.className}</b></p>
                <p>Date: <b> ${reminderToCustomerData.date} </b></p>
                <p>Time: <b>${reminderToCustomerData.time} EST </b></p>
                <h3>Join with this link: <a href=${reminderToCustomerData.zoomLink}> ${reminderToCustomerData.zoomLink} </a> </h3>
                <br/>
                <p>@description</p>
                <p> Remember for this class you will need  ${reminderToCustomerData.recipe}. </p>
                <h4>  We look forward to having you join!</h4>
        `;
}

module.exports = reminderToCustomerTemplate;