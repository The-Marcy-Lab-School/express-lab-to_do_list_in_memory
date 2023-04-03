// This file just logs things out to your NODE console.
// It might be helpful!
const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

module.exports = logRoutes;
