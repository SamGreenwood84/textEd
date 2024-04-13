const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client/dist' directory
app.use(express.static(__dirname + '/client/dist'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/dist/index.html');
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));