const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8050;

app.use(bodyParser.json());

const users = [];

// Middleware untuk logging (gunakan Morgan jika diinginkan)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST /users
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  // Update user dengan ID yang sesuai
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Hapus user dengan ID yang sesuai
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send('User deleted');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
