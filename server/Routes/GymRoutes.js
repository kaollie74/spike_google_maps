// const express = require('express');
// const router = express.Router();
// const axios = require('axios');


// require('dotenv').config();

// //const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
// const GIPHY_API_KEY = process.env.GIPHY_API_KEY;


// router.get('/', (req, res) => {
//   console.log('Hitting Google Router');
//   axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`)

//     .then((response) => {
//       console.log('Back from Google Search', response);
//       res.send(response.data)

//     })
//     .catch((error) => {
//       console.log('Error with doing search', error);
//       res.sendStatus(500);
//     })


// })

// module.exports = router;