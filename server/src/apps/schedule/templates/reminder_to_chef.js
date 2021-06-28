function getReminderToChef(reminderToChefData) {
    return `
        <p>Hi <b>${reminderToChefData.chef_name}</b>, this is a reminder mail about your cooking class scheduled for tomorrow. </p>
        <p>Class name: <b> ${reminderToChefData.class_name} </b></p>
        <p>Date: <b> ${reminderToChefData.date} </b></p>
        <p>Time: <b> ${reminderToChefData.time} EST </b></p>
        <h3>Join with this link: <a href=${reminderToChefData.zoom_link}> ${reminderToChefData.zoom_link} </a> </h3>
    `;
}