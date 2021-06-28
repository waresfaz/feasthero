/**
 * @description parse an html template
 * @param {String} html - html text to parse 
 * @returns String
 */
 function parse(html, obj) {
    stripAtSymbol = (str) => str.replace('@', '')
    return html.replace(new RegExp('@([^ ]+)'), (old) => obj[stripAtSymbol(old)]);
}

module.exports = parse;