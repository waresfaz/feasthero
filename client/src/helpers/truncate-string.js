/**
 * @summary truncate a string to a certian amount of characters.
 * @param {String} str - String to truncate
 * @param {Integer} num - number of characters to keep 
 * @returns {String} - the truncated string
 */
function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

export default truncateString;