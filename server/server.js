require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
//const searchRouter = require('./Routes/GymRoutes')
const axios = require('axios')


/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
//app.use('/random', randomRouter);

//app.use('/search', searchRouter)

//const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// app.get('/search', (req, res) => {
//   console.log('Hitting Google Router');

//   axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?type=gym&location=-93.263397,44.978008&radius=10000&key=${GOOGLE_API_KEY}
// `)

//     .then((response) => {
//       console.log('Back from Google Search', response);
//       res.send(response.data)

//     })
//     .catch((error) => {
//       console.log('Error with doing search', error);
//       res.sendStatus(500);
//     })


// })


  


app.post('/api/search', (req,res)=> {
  console.log('hitting search post', req.body)

  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.search}&type=gym&radius=8000&key=${GOOGLE_API_KEY}`)

.then((response)=> {
  res.send(response.data)
})
.catch((error)=> {
  res.sendStatus(500);
})
});



/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log('Listening on port: ', port);
});