/**
 * @description html to be parsed
 * 
 * strings starting with `@` will be replaces
 * 
 * @returns String
 */
function reminderToCustomer() {
        return `
    Hi <b>@customer_first_name
        </b>, this is a reminder mail about your cooking class scheduled for tomorrow.
<p>
Here’s everything you need to know for your class with <b>@name
        </b>:<p>

<p>
Class name: <b>@class_name</b></p>
<p>
Date: <b> @date </b></p>
<p>
Time: <b>@time EST </b></p>
<h3>
Join with this link: <a href=@zoom_link> @zoom_link </a> </h3>
<br/>
<p>
@description
</p>
<p> Remember for this class you will need  @recipe. </p>

<h4>  We look forward to having you join!</h4>
`
}