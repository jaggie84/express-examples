const express = require('express');
const nunjucks = require('nunjucks');
const body_parser = require('body-parser');
const pgp = require('pg-promise')({});
const db = pgp({database: 'blog', user: 'postgres'});

var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.use(body_parser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.send('Hello World!');
});

app.get('/about', function (request, response) {
  response.send('About Me');
});

app.get('/projects', function (request, response) {
  response.send('Projects');
});

app.get('/post/:slug', function (request, response, next) {
  var slug = request.params.slug;
  
  db.one('SELECT * FROM post WHERE slug=$1', [slug])
   .then(function (results) {
     response.send(results);
   })
   .catch(next);
});

app.get('/hello', function (request, response) {
  var name = request.query.name || 'World';
  var context = {
    title: 'Hello',
    name: name,
    friends: [{name: "Joan"}]
  };
  
  response.render('index.html', context);
});

app.get('/form', function(req, resp) {
  resp.render('form.html');
});

app.post('/submit', function (req, resp) {
  console.log(req.body);
  
  //resp.render('thanks.html');
  
  resp.redirect('/some-where-else');
});


app.listen(8080, function () {
  console.log('Listening on port 8080');
});