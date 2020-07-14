const express = require('express');
const models = require('./models');
const { where } = require('sequelize');
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await models.User.findAll();
  res.json({ data: users });
});

app.get('/users/:id', async (req, res) => {
  const users = await models.User.findOne({ where: { id: req.params.id } });
  res.json({ data: users });
});

app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const resp = await models.User.create({ firstName, lastName, email });
    console.log('resp >>>> ', resp);
    res.json({
      message: 'created!',
      data: resp
    });
  } catch (error) {
    res.json({
      message: error.message
    });
  }
});

app.put('/users/:id', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const resp = await models.User.update(
    { firstName, lastName, email },
    { where: { id: req.params.id } }
  );
  console.log('resp >>>> ', resp);
  res.json({
    message: 'updated!',
    data: resp
  });
});

app.get('*', (req, res) => res.json({ message: 'sweet!' }));

app.listen(3030, () => console.log('server running'));
