function reminderToChefTemplate(reminderToChefData) {
    return `
        <p>Hi <b>${reminderToChefData.chefName}</b>, this is a reminder mail about your cooking class scheduled for tomorrow. </p>
        <p>Class name: <b> ${reminderToChefData.className} </b></p>
        <p>Date: <b> ${reminderToChefData.date} </b></p>
        <p>Time: <b> ${reminderToChefData.time} EST </b></p>
        <h3>Join with this link: <a href=${reminderToChefData.zoomLink}> ${reminderToChefData.zoomLink} </a> </h3>
    `;
}

module.exports = reminderToChefTemplate;