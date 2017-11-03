var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	multer = require('multer');
	ejs = require('ejs'),
	bodyParser = require('body-parser'),
	passport = require('passport');
	LocalStrategy = require('passport-local'),
	User = require('./models/users'),
	Image = require('./models/image')

var authRoutes = require('./routes/user');
var imageRoutes = require('./routes/image');

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test2', {
  useMongoClient: true,
  /* other options */
}).then(function(){
	console.log('Mongodb has connected');
});





/*local temp storage

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
*/






app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(require('express-session')({
	secret:'secret',
	resave:false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoutes);
app.use(imageRoutes);

app.listen(3000, function(){
	console.log('listening on port 3000');
})