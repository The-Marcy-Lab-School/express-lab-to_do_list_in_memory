const controller = (req, res) => {
  const { ToDo } = req;
  const result = ToDo.deleteAll();

  res.sendStatus(result ? 204 : 404);
};

module.exports = controller;
