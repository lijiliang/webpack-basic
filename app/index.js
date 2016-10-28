//require('./main.css');
import './main.css';
var sub = require('./sub.js');
var $ = require('jquery');
var moment = require('moment');
var app = document.createElement('div');

app.innerHTML = '<h1>Hello World</h1>';
document.body.appendChild(app);
app.appendChild(sub());
$('body').append('<p>look at me! now is ' + moment().format() + '</p>');

let abc = 'abc;';
console.log(abc);
