/**
 * @description html to be parsed
 * 
 * strings starting with `@` will be replaces
 * 
 * @returns String
 */
function getReminderToChef() {
    return `Hi <b>@chef_name</b>, this is a reminder mail about your cooking class scheduled for tomorrow.        
<p>
Class name: <b>@class_name</b></p>
<p>
Date: <b> @date </b></p>
<p>
Time: <b>@time EST </b></p>
<h3>
Join with this link: <a href=@zoom_link> @zoom_link
 </a> </h3>
`;
}