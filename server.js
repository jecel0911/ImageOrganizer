
//Inicialization
var express = require('express'),
	http	= require("http"),
	mongoose= require('mongoose'),
	upload  = require('jquery-file-upload-middleware'),
	app		= express(),
	server	= http.createServer(app);

//Configuration of Uploader
upload.configure({
	uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads',
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
});

//Configuration of app
app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.multipart());

	app.use(express.static(__dirname + '/public'));
	//app.use(express.staticProvider(__dirname + '/public'));
	app.use(express.methodOverride());
	app.use(app.router);
});

/* ROUTES */
//
app.get('/',function(req,res){
	res.sendfile(__dirname + '/public/index.html');
});

var db = 'dbImageGallery'; //Pruebas y Desarrollo
//var db = 'dbProductionImageGallery';



routes  = require('./routes/ImageGallery')({"app":app,"db":db});

//DB connect
mongoose.connect('mongodb://localhost/'+db, function(err,res){
	if(err){
		console.log('ERROR: connecting to Database. ' + err);
	}else{
		console.log(' - Connected to Database');
	}
});

server.listen(3000,function(){
	console.log(" - Node Server running on localhost:3000");
});