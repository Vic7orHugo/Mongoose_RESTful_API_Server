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

mongoose.connect('mongodb://localhost:27017/edx-course-db'); // Connectiong to database using mongoose connect method
mongoose.Promise = global.Promise;	// Mongoose promise acquiring the ES6 global promise
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
	Account.find({}, (error, accounts) => {
		if (error) return next(error)
		res.send(accounts)
		console.log('Request to show accounts finished.')
	})
});

app.get('/accounts/:id', (req, res, next) => { // GET by ID
	Account.findById(req.params.id, (error, account) => {
		if (error) return next(error);
		res.send(account.toJSON());
		console.log(account.name, 'account information sent.');
	});
});

app.post('/accounts', (req, res, next) => {	// POST
	let newAccount = new Account(req.body);
	newAccount.save((error, account) => {
		if (error) return next(error)
		res.send(account)
		console.log(`${req.body.name} account saved!`)
	})
});

app.put('/accounts/:id', (req, res, next) => { // PUT
	Account.findOne({_id: req.params.id}, (error, account) => {
		if (error) return next(error)
		if (req.body.name) account.name = req.body.name;
		if (req.body.balance) account.balance = req.body.balance;
		account.save()
		res.send(account)
		console.log(`${account.name} account updated!`)
	})
});

app.delete('/accounts/:id', (req, res, next) => { // DELETE
	Account.remove({_id: req.params.id}, (error, account) => {
		if (error) return next(error)
		res.send(account)
		console.log('The selected account was removed!')
	})
});

// Server listener
app.listen(3000);