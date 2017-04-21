const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('test shopping list routes', function() {
	before(function() {
		return runServer;
	});
	after(function() {
		return closeServer;
	})
	//GET
	it('it should list items on GET', function() {
		return chai.request(app).get('/shopping-list')
			.then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body.length.should.be.at.least(1);
			const expectedKeys = ['id', 'name', 'checked'];
			res.body.forEach(function(item) {
				item.should.be.a.('object');
				item.should.include.keys(expectedKeys);
			});
		});
	});
	//POST
	it('it should list items for POST', function() {
		const newItem = {name: 'coffee', checked: false};
		return chai.request(app).post('/shopping-list')
		.send(newItem)
		.then(function(res) {
			res.should.have.status(201);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.include.keys('id', 'name', 'checked');
			res.body.id.should.not.be.null;
			res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
		});
	});
	//PUT
	it('it should PUT an updated item', function() {
		const updateItem = {
			name: 'foo',
			checked: true;
		};
		return chai.request(app).get('/shopping-list')
		.then(function(res) {
			updateItem.id = res.body[0].id;
			return chai.request(app).put(`shopping-list/${updateItem.id}`)
			.send(updateItem);			
		}).then(function(res) {
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.deep.equal(updateItem);
		});
	});
	//DELETE
	it('should test DELETE item', function() {
		return chai.request(app).get('/shopping-list')
		.then(function(res) {
			return chai.request(app)
			.delete(`shopping-list/${res.body[0].id}`);
		}).then(function(res) {
			res.should.have.status(204);
		});
	});
});