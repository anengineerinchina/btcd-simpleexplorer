var mongode = require('mongode');
var db = mongode.connect('mongodb://127.0.0.1/test');

module.exports=db;
