// Require
var express = require('express');
var posts   = require('./mock/posts.json');


// Init express
var app = express();


// Configure views
app.set('view engine', 'jade');
app.set('views', __dirname  + '/views');


// Static server
app.use(express.static(__dirname + '/public'));


// Routes
app.get('/', function(req, res) {
  res.render('index', {title: 'Home'});
});

app.get('/blog', function(req, res) {
  res.render('blog', {title: 'Blog', posts: posts});
});

app.get('/blog/:title', function(req, res) {
  var title = req.params.title;
  var post = posts[title];
  if (post !== undefined) {
    res.render('post', {title: post.title, post: post});
  } else {
    res.status(404);
    res.redirect('/blog');
  }
});


// 404
app.get('*', function(req, res) {
  res.status(404);
  res.redirect('/');
});


// Serve
app.listen(3000, function() {
  console.log('The server is running on port 3000...');
});
