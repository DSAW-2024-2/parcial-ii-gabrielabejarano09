const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(403).send("Requires valid token");
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      req.user = user;
      next();
    });
  }
  
  router.get('/', authenticateToken, async (req, res) => {
    const { latitude, longitude } = req.query;
  
    // Verifica que latitude y longitude están presentes
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude y Longitude are required' });
    }

    // Verifica que latitude y longitude sean números
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: 'Latitude and Longitude must be a number' });
    }
  
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    try {
        const response = await fetch(url);
    
    
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const temperature = data.current_weather.temperature;

 
        res.json({ temperature });

    } catch (error) {

        res.status(500).json({ message: 'Error in consulting the Open Meteo API', error: error.message });
    }
});
  
  module.exports = router;