const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


const user = {
  email: 'admin@admin.com',
  password: 'admin'
};

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(403).json({ message: 'Incorrect credentials' });
  }
});

module.exports = router;