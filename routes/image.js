var express = require('express');
var router = express.Router();
var Image = require('../models/image');
var multer = require('multer');
var middleware = require('../middleware');



var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './public/uploads')
	},
	filename: function(req,file,cb){
		cb(null, file.originalname);
	}
});

var upload = multer({
	storage:storage
});

//index routes
router.get('/', function(req,res){
	Image.find({}, function(err, foundImage){
		if(err){
			console.log(err)
		} else{
			res.render('index', {image:foundImage, user:req.user});
		}
	});
});

router.get('/upload', function(req,res){
	res.render('upload');
})

//post route upload image
router.post('/', middleware.isLoggedIn, upload.single('image'), function(req,res){

	var path = req.file.path;
	var newPath = path.replace('public','');
	var imageName = req.file.originalname;
	var description = req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	}

	var image = {path:newPath, originalName:imageName, description:description, author:author};

	Image.create(image, function(err,uploadedImage){
		if(err){
			console.log(err);
		} else{
			res.redirect('/');
		}
	});
});

router.get('/profile',middleware.isLoggedIn, function(req,res){
	Image.find({'author.id': req.user._id}, function(err,foundImage ){
		res.render('profile', {image:foundImage});
	});
});

//EDIT

router.get('/:id/edit', function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){

	})
});

module.exports = router;
