const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');


const API_PORT = 3001;
const app = express();

const path = require('path');
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));
// Anything that doesn't match the above, send back index.html

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/search', (req, res) => {

 let searchQuery;

 if (req.body.camera === "any") {
     searchQuery = `http://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${req.body.sol}`
 } else {
      searchQuery = `http://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=${req.body.sol}&camera=${req.body.camera}`
 }

 axios.get(searchQuery).then(response => {
     console.log("MARS API RESPONSE:", response.data)
     res.json(response.data);
 }).catch(error => {
     console.log("Error in Mars API request: ", error)
 });
});


app.listen(process.env.PORT || API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
