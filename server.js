const mongodb = require('./database/mongodb/db');
const userQuery = require('./database/mongodb/query'); 

mongodb.connectDB();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let users = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/users', (req, res) => {
  userQuery.getUsers().then((users) => {
    res.json(users);
  });
});

app.post('/users', (req, res) => {
  const user = req.body;
  console.log(req);
  userQuery.createUser(user).then((user) => {
    res.status(201).json(user); 
  })
});
  
app.put('/users/:id', (req, res) => {
  const { id } = req.params; 
  const user = req.body; 
  userQuery.updateUser(id, user).then((user) => {
    res.status(200).json(user); 
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params; 
  userQuery.deleteUser(id).then(() => {
    res.status(204).send(); 
  });
});

app.get('/users/search', (req, res) => {
    const { name } = req.query; 

    if (!name) {
      return res.status(400).send({ message: "Name query parameter is required" });
    }
    userQuery.findByName(name).then((users) => {
      res.status(200).json(users); 
    });    
});