/*
	server.js - A CRUD RESTful API using Mongoose to create relational queries for our noSQL Mongo Database.
	31/03/2018 14:48 (GMT -03:00)
 */

// Importing modules
const express = require('express');				// Express server
const logger = require('morgan');				// Request logging
const errorhandler = require('errorhandler');	// Error handling
const bodyParser = require('body-parser');		// Parses the payloads
const mongoose = require('mongoose');			// Enables mongoose methods

mongoose.Promise = global.Promise	// Mongoose promise acquiring the ES6 global promise
let app = express(); 				// Instance of Express.js
app.use(logger('dev'));				// Middleware for server logging
app.use(bodyParser.json());			// Middleware to parse the body data
app.use(errorhandler());			// Error handler middleware

const Account = mongoose.model('Account', { // Account custom schema
	name: String,
	balance: Number
})

// CRUD method requests
app.get('/accounts', (req, res, next) => {// GET
	mongoose.connect('mongodb://localhost:27017/edx-course-db') // Connectiong to database using mongoose connect method
	Account.find({}, (error, accounts) => {
		if (error) return next(error)
		res.send(accounts)
		console.log('Request to show accounts finished.')
		mongoose.disconnect()	// Disconnects after every request
	})
});

app.post('/accounts', (req, res, next) => {	// POST
	mongoose.connect('mongodb://localhost:27017/edx-course-db') // Connectiong to database using mongoose connect method
	let account = new Account({
		name: req.body.name,
		balance: req.body.balance
	});
	account.save((error, results) => {
		if (error) return next(error)
		res.send(results)
		console.log(`${req.body.name} account saved!`)
		mongoose.disconnect()	// Disconnects after every request
	})
});

app.put('/accounts/:id', (req, res, next) => { // PUT
	mongoose.connect('mongodb://localhost:27017/edx-course-db') // Connectiong to database using mongoose connect method
	Account.findOne({_id: req.params.id}, (error, results) => {
		if (error) return next(error)
		results.balance = req.body.balance;
		results.save()
		res.send(results)
		console.log(`${results.name} account updated!`)
		mongoose.disconnect()	// Disconnects after every request
	})
});

app.delete('/accounts/:id', (req, res, next) => { // DELETE
	mongoose.connect('mongodb://localhost:27017/edx-course-db') // Connectiong to database using mongoose connect method
	Account.remove({_id: req.params.id}, (error, results) => {
		if (error) return next(error)
		res.send(results)
		console.log('The selected account was removed!')
		mongoose.disconnect()	// Disconnects after every request
	})
});

// Server listener
app.listen(3000);