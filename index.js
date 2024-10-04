require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginRouter = require('./routes/login');
const weatherRouter = require('./routes/weather');

app.use('/login', loginRouter);
app.use('/weather', weatherRouter);


app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});