/**
 * Tokens module
 * @module Tuleap/Models/tokens
 */

'use strict';

/**
 * Standard request cb
 * @callback requestCallback
 * @param {Error} Error
 * @param {object} Data
 */

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Tokens');

/**
 * @class
 * @param {object} client - API client
 * @constructor
 */
var Tokens = function (client) {
	if (!client) {
		throw new Error('No client object.');
	}
	this.client = client;
	this.path = '/tokens/';
};

/**
 * Endpoint: POST /tokens
 * https://tuleap.net/api/explorer/#!/tokens/create
 * Generate a token for authentication for the current user.
 *
 * @param {string} username - Authentication username
 * @param {string} password - Authentication password
 * @param {requestCallback} cb - The callback function
 * @returns {*} - Request object
 */
Tokens.prototype.login = function (username, password, cb) {

	var body = {
		"username": username,
		"password": password
	};

	return this.client
		.post(
			this.path,
			{body: body},
			function (err, res, data) {
				Debug("Login: \n%j\n%j\n%j", err, res, data);

				var r = Utils.resParse(err, res, data);

				Debug("Login parsed:\n", r);
				if (!r[0]) { // Check for error
					this.client.config.auth = r[1]; // Save parsed data
				}

				if (cb) cb.apply(null, r);
			}.bind(this)
		);

};

/**
 * Endpoint: DELETE /tokens
 * https://tuleap.net/api/explorer/#!/tokens/removeAll
 * Expire all tokens of the current user.
 *
 * @param {requestCallback} cb - The callback function
 * @returns {*} - Request object
 */
Tokens.prototype.logout = function (cb) {

	return this.client
		.delete(
			this.path,
			{},
			function (err, res, data) {
				Debug("Logout: \n%j\n%j\n%j", err, res, data);
				if (cb) cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

// Returns the actual token string
/**
 * Token
 * return the current active token or empty
 *
 * @returns {string} The current active token
 */
Tokens.prototype.token = function () {

	if (this.client.config.auth && this.client.config.auth.token) {
		return this.client.config.auth.token;
	}

	return '';

};

/**
 * UserId
 * return the current active UserID connected to the generated token
 *
 * @returns {number} The current active UserId
 */
Tokens.prototype.userid = function () {

	if (this.client.config.auth && this.client.config.auth.user_id) {
		return this.client.config.auth.user_id;
	}

	return 0;
};

/**
 * Tokens module exported
 *
 * @type {Tokens}
 */
module.exports = Tokens;