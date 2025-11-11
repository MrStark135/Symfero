import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';

const app = express();
configDotenv();

app.use(cors({}));

// allow to communication only with the client
const restrictAccess = (req, res, next) => {
	if (req.ip == process.env.CLIENT_HOSTNAME) next();
	else res.status(403).send('Host not allowed: '+req.ip);
};
app.use(restrictAccess);

app.get('/', (req, res) => {
	res.send('Symfero server');
});
app.get('/messages', (req, res) => {
	const messages = [
		{
			time: Date.now(),
			sender: "Adolf Hitler",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},{
			time: Date.now()-1,
			sender: "User03",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},{
			time: Date.now()-2,
			sender: "Adolf Hitler",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}
	];
	res.send('Access-Control-Allow-Origin', 'https://'+process.env.CLIENT_HOSTNAME);
	res.send(messages);
});
app.get('/env', (req, res) => {
	res.send('no data');
})

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Symfero server created serving only ${process.env.CLIENT_HOSTNAME}`);
});
