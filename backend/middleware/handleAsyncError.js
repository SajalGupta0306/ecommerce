// method to handle async/await issues > Promise to enact as a try/catch to avoid muliple try catch blocks in controller file
module.exports = handleErr => (req, res, next) => {
  Promise.resolve(handleErr(req, res, next)).catch(next);
};
