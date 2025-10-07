const usersService = require('../services/usersService');

function getAll(req, res) {
  res.json(usersService.getAll());
}

function getById(req, res) {
  const user = usersService.getById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const user = usersService.create(name);

  res.status(201).json(user);
}

function update(req, res) {
  if (req.method === 'PUT' && req.body.name == null) {
    return res.status(400).json({ error: 'name is required' });
  }

  const updated = usersService.update(req.params.id, req.body.name);

  if (!updated) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(updated);
}

function remove(req, res) {
  const deleted = usersService.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
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
