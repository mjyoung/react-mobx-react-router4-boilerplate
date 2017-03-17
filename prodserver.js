const express = require('express');
const compression = require('compression');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

console.log(`Starting app on ${PORT}`); // eslint-disable-line no-console

app.listen(process.env.PORT || 8080);
