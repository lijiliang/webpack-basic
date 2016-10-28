//require('./main.css');
import './main.css';
var sub = require('./sub.js');
var $ = require('jquery');
var app = document.createElement('div');

app.innerHTML = '<h1>mobile body</h1>';
document.body.appendChild(app);
app.appendChild(sub());
$('body').append('<p>look at me! now is ' + moment().format() + '</p>');

let abc = 'asdfasdf;';
console.log(abc);
