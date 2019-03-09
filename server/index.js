'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
	Server app instance module for StarterKit's backend service
*/

// // Ping Route to check server status
// app.get('/ping', (req, res, next) => {
// 	/*	Things to return to client
// 		- Status of server
// 		- Server/Container Load
// 	*/
// 	res.end(JSON_string({
// 		status: 200
// 	}));
// });

// // 404 route handler
// app.use((req, res, next) => {
// 	res.status(404).send("ERR 404: Cannot find requested resource");
// });

// // 500 internal server error route handler
// app.use((err, req, res, next) => {
// 	// Log trace stack and error to the console
// 	error(err.stack);
// 	res.status(500).send('ERR 500: Internal server error');
// });

const Koa = require('koa');
const app = new Koa();
const { port } = require('./config');
const { print, error, JSON_string } = require('./utils');

// logger
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
	ctx.body = 'Hello World';
});

app.listen(3000).on('listening', () => print(`Server listening to port ${port}`));