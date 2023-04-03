const ToDo = require('../models/to-do');

const addModels = (req, res, next) => {
  req.ToDo = ToDo;
  next();
};

module.exports = addModels;
