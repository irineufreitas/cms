// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');

// Import your routing files here
var documentRoutes = require('./server/routes/documents');
var messageRoutes = require('./server/routes/messages');
var contactRoutes = require('./server/routes/contacts');

// establish a connection to the mongo database
mongoose.connect('mongodb://localhost:27017/cms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB database!');
})
.catch(err => {
  console.error('❌ Connection failed:', err);
});

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev')); // Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Serve static files from Angular Universal output folder
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Map routes
app.use('/', index);
app.use('/documents', documentRoutes);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);

// Catch-all route - redirect unmatched URLs to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});


// Set the port and create HTTP server
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log('✅ API running on http://localhost:' + port);
});