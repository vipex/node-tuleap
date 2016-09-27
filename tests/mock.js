'use strict';
var nock = require('nock');
var data = require('./mock-data.json');

module.exports.createAPIMock = _createAPIMock;
function _createAPIMock() {
	var headers = {"Content-Type": "application/json"};
	var server = nock(data.config.server);

	// Tokens
	server.post('/api/tokens/').reply(function (u, r, cb) {
		if (r.username && r.password) {
			if (r.username === data.config.username && r.password === data.config.password) {
				return cb(null, [200, data.endpoints.tokens.token, headers]);
			} else {
				return cb(null, [401, data.endpoints.tokens['401'], headers]);
			}
		} else {
			return cb(null, [400, data.endpoints.tokens['400'], headers]);
		}
	});
	server.delete('/api/tokens/').reply(function (u, r, cb) {
		if (!u.split('/')[4]) {
			return cb(null, [200, '']);
		} else {
			if (u.split('/')[4] === data.endpoints.tokens.token.token) {
				return cb(null, [200, '', headers]);
			} else {
				return cb(null, [500, data.endpoints.tokens['500'], headers]);
			}
		}
	});

	// Projects
	server.get('/api/projects/').query(true).reply(200, data.endpoints.projects['projects']);
	server.get('/api/projects/101').query(true).reply(200, data.endpoints.projects['projects/101']);
	server.get('/api/projects/101/backlog').query(true).reply(200, data.endpoints.projects['projects/101/backlog']);
	server.get('/api/projects/101/trackers').query(true).reply(200, data.endpoints.projects['projects/101/trackers']);
	server.get('/api/projects/999').query(true).reply(404, data.endpoints.projects['projects/999']);
	server.get('/api/projects/999/backlog').query(true).reply(404, data.endpoints.projects['projects/999/backlog']);
	server.get('/api/projects/999/trackers').query(true).reply(404, data.endpoints.projects['projects/999/trackers']);
	// Trackers
	// TrackerReports
	// Artifacts
	// ArtifactFiles

	return server;
}

module.exports.createBaseMock = _createBaseMock;
function _createBaseMock() {
	var headers = {"Content-Type": "application/json"};
	var server = nock(data.config.server + '/api');

	// Base test
	server.get('/').reply(200, {}, headers);
	server.post('/').reply(function (u, r, cb) { return cb(null, [200, r, headers]); });
	server.put('/').reply(function (u, r, cb) { return cb(null, [200, r, headers]); });
	server.patch('/').reply(function (u, r, cb) { return cb(null, [200, r, headers]); });
	server.delete('/').reply(200);
}
