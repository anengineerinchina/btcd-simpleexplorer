var dogecoin = require('node-dogecoin')();
dogecoin.auth('user', 'passWord1234!');

module.exports = dogecoin;

