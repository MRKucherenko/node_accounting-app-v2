const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

function getAll(req, res) {
  const { userId, from, to, categories } = req.query;

  res.json(
    expensesService.getAll({
      userId,
      from,
      to,
      categories,
    }),
  );
}

function getById(req, res) {
  const expense = expensesService.getById(req.params.id);

  if (!expense) {
    return res.status(404).end();
  }
  res.json(expense);
}

function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).end();
  }

  const user = usersService.getById(userId);

  if (!user) {
    return res.status(400).end();
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
}

function update(req, res) {
  const updated = expensesService.update(req.params.id, req.body);

  if (!updated) {
    return res.status(404).end();
  }
  res.json(updated);
}

function remove(req, res) {
  const deleted = expensesService.remove(req.params.id);

  if (!deleted) {
    return res.status(404).end();
  }
  res.status(204).end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
