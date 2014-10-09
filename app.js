
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');
var app = express();


var doge=require("./dogeapi");


// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
console.log('BitcoinDark Simple Info Starting');

var server = http.createServer(app).listen(app.get('port'), function(err, result){
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req,res){
	res.render('index');
	});	

app.get('/totalbtcd', function(req, res){
	doge.getinfo(function(err, result){
		if(err)
			res.send(err);
		else{
			var money = result.moneysupply.toString();	
			res.send(money);
		}
	});
});	
	
app.get('/blockcount', function(req,res){
	doge.getinfo(function(err, result){
		if(err)
			res.send(err);
		else{
		var blocks = result.blocks.toString();	
		res.send(blocks);
		}
	});	
});
app.get('/difficulty', function(req,res){
	doge.getDifficulty(function(err, result){
		if(err)
			res.send(err);
		else
			res.send(result);
	});
});	

app.get('/getblockhash/:index', function(req, res){
	doge.getblockhash(parseInt(req.params.index), function(err, hash){
		if(err)
			res.send(err);
		else
			res.send(hash);
	});
});

app.get('/getblock/:hash', function(req, res){
	doge.getblock(req.params.hash, function(err, data){
		if(err)
			res.send(err);
		else
			res.render('block', data);
	});
});


app.get('/gettx/:txid', function(req, res){

	doge.gettransaction(req.params.txid, function(err, data){
		if(err)
			res.send("Error parsing transaction id");
		else
			res.render('tx', data);
	});


});




    
