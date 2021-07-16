/**
 * wait for an async function. If an error is thrown, move onto the error handling middleware
 * 
 * @param {Function} fn - the async function to wait for
 */
const wait = fn =>
    async (req, res, next) => {
        return await fn(req, res, next).catch(next);
    };

module.exports = wait;