const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('testing the recipes routes', function() {
	before(function() {
		return runServer();
	});
	after(function() {
		return closeServer(); 
	});
	//GET
	it('testing the GET method for recipes', function() {
		return chai.request(app).get('/recipes')
		.then(function(res) {
			res.status.should.have(200);
			res.should.be.json;
			res.body.should.be('array');
			res.body.length.should.be.at.least(1);
			const expectedKeys = ['id', 'name', 'ingredients'];
			res.body.forEach(function(item) {
				item.should.be.a('object');
				item.should.include.keys(expectedKeys);
			});
		});
	});
	//POST
	it('testing the POST method for recipes', function() {
		return chai.request(app).get('/recipes')
		.then(function(res) {
			res.body.json
			res.status.should.have()
		});
	});
	//PUT
	it('testing the GET method for recipes', function() {
		
	});
	//DELETE
	it('testing the GET method for recipes', function() {
		
	});
})