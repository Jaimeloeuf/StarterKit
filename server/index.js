'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Server app instance module for StarterKit's backend service
*/


const express = require('express');
const app = express();
const { port } = require('./config');
const { print, error, JSON_string } = require('./utils');

// Create a static server to serve the files in the faq directory
app.use(express.static('../faqs'));

// Ping Route to check server status
app.get('/ping', (req, res, next) => {
	/*	Things to return to client
		- Status of server
		- Server/Container Load
	*/
	res.end(JSON_string({
		status: 200
	}));
});

// 404 route handler
app.use((req, res, next) => {
	res.status(404).send("ERR 404: Cannot find requested resource");
});

// 500 internal server error route handler
app.use((err, req, res, next) => {
	// Log trace stack and error to the console
	error(err.stack);
	res.status(500).send('ERR 500: Internal server error');
});

app.listen(port, () => print(`Server listening to port ${port}`));