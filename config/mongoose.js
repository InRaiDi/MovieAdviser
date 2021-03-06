// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	const db = mongoose.connect(config.db, {
		useUnifiedTopology: true,
		useNewUrlParser: true, useCreateIndex: true 
		}).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('Error');
		});

	// Load the 'User' model 
	require('../app/models/user.server.model');
	//Load the 'Movies' model
	require('../app/models/movies.server.model');

	// Return the Mongoose connection instance
	return db;
};