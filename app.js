const express = require('express');
const nunjucks = require('nunjucks');

const body_parser = require('body-parser');
const pgp = require('pg-promise')({});


var app = express();

app.use(body_parser.urlencoded({extended: false}));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.use(express.static('public'));

app.get('/', function (request, response) {
  response.send('Hello World Again!');
});

app.get('/about', function (request, response) {
  response.send('About Me');
});

app.get('/projects', function (request, response) {
  response.send('Projects');
});

app.get('/post/:slug', function (request, response) {
  var slug = request.params.slug;
  response.send('Post About: ' + slug);
});

app.get('/hello', function (request, response) {
var name = request.query.name || 'World';
  var context = {title: 'Hello', name: name};
  
  response.render('index.html', context);
});

app.get('/form', function(req, resp) {
  resp.render('form.html');
});

app.post('/submit', function (request, response) {
  console.log(request.body);
  
  response.send('OK');
});

app.listen(8080, function () {
  console.log('Listening on port 8080');
});