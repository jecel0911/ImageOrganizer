
module.exports = function(operators) {
	var app = operators.app;
	var db = operators.db;

	var ImageGallery = require('../models/ImageGallery.js');
	var url = require('url');

	//GET - Return all Elements in DBs
	_findAll = function(req,res){
		debugger;
		var queryString = req.query.queryString;
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
		ImageGallery.find({Description:new RegExp(queryString, 'i')},function(err,list){
			if(!err){
				res.send(list);
			}else{
				console.log('ERROR: ' + err);
			}
		});
	}

	//GET id - Return an unique element by ID.
	_findById = function(req,res){
		debugger;
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
		ImageGallery.findById(req.params.id,function(err,element){
		if(!err){
			res.send(element);
		}else{
			console.log('ERROR: ' + err);
			res.send('');
		}
		});
	}

	//POST - Add a new element in DBs
	_save = function(req,res){
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
		var body = JSON.parse(req.body.json);
		var imageGalleryTemp = new ImageGallery({
			Description: body.Description,
			Images: []
		});
		
		imageGalleryTemp.save(function(err){
			if(!err){
				console.log('created');
				res.send(imageGalleryTemp);
			}else{
				console.log('ERROR: ' + err);
				res.send('');
			}
		});
	}

	//POST - Add an related Image.


	//PUT - update a register
	_update = function(req,res){
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
		ImageGallery.findById(req.params.id,function(err,element){
			var body = JSON.parse(req.body.json);
			element.Description = body.Description;
			element.Updated = new Date();
			element.save(function(err){
				if(!err){
					console.log('updated...');
					res.send(element);
				}else{
					console.log('ERROR updating: ' + err);
					res.send('');
				}
			});
		});
	}


	//DELETE - delete an element by id.
	_delete = function(req,res){
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
		ImageGallery.findById(req.params.id,function(err,element){
			element.remove(function(err){
				if(!err){
					console.log('removed...');
					res.send(true);
				}else{
					console.log('ERROR: ' + err);
					res.send(false);
				}
			});
		});
	}

	_upload = function(req,res){
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
		debugger;
	    //console.log(JSON.stringify(req.files));

	    var now = new Date();
	    var timestamp = '' + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();

	    var basePath = require('path').dirname(require.main.filename);
	    var filePath = '/uploads/'+db+'/ImageGallery/' + timestamp + '_' + req.files.myfile.name;
	    var serverPath = basePath + '/public' +filePath;


	    var destinyPathNormaliced = require('path').normalize(serverPath);
	    var filePathNormaliced = require('path').normalize(filePath);
	    var pathTemp = req.files.myfile.path;

	    console.log(require('path').normalize(pathTemp));
	    console.log(require('path').normalize(destinyPathNormaliced));

	    require('fs-extra').move(
			require('path').normalize(pathTemp),
			require('path').normalize(destinyPathNormaliced),
			function(err){
	            if(err){
					res.send({
	                    err: 'Ah crap! Something bad happened' + err
					});
	            	return;
	            }
	            ImageGallery.findById(req.body.idQuestion,function(err,_question){
		            if(err){
		            	res.send({err:'Error Loooking for Question:' + err});
		            }
		            _question.Images.push({
		            	"path": filePathNormaliced 
		            });
		            _question.save(function(err){
						if(!err){
							console.log('file add');
							res.send({path: filePathNormaliced});
						}else{
							console.log('ERROR adding File: ' + err);
							res.send({err:err});
						}
					});
				});
			}
	    );
	}



	//Union local functions and API functions
	app.get('/ImageGallery',_findAll);
	app.get('/ImageGallery/:id',_findById);
	app.post('/ImageGallery',_save);
	app.post('/upload',_upload);
	app.put('/ImageGallery/:id',_update);
	app.delete('/ImageGallery/:id',_delete);










}












