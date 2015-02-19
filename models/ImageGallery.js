
//Model For ImageGallery (Crud, and operations)

var mongoose = require('mongoose'),
	Schema 	 = mongoose.Schema;

var imageGallerySchema = new Schema({
	Description: {type: String},
	Updated : {type: Date, default: Date.now},
	Images: []
});

module.exports = mongoose.model('ImageGallery',imageGallerySchema);