var mongoose  = require('mongoose');

//schema models
var imageSchema = new mongoose.Schema({

	path:{
		type:String,
		required:true,
		trim: true
	},
	originalName:{
		type:String,
		require:true
	},
	description:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		username:String
	}
});

module.exports = mongoose.model('Images', imageSchema);