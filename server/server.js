import express from 'express';
import cors from 'cors';
import authRouter from './app/routes/auth.js';
import chatRouter from './app/routes/chat.js';
import messageRouter from './app/routes/message.js';

const app = express();

// lame security code
app.use(cors({}));
// allow to communication only with the client
const restrictAccess = (req, res, next) => {
	if (req.ip == process.env.CLIENT_HOSTNAME) next();
	else res.status(403).send('Host not allowed: '+req.ip);
	// next(); // quick bypass
};
app.use(restrictAccess);

// body parser
app.use(express.json());

// initialize
app.get('/', (req, res) => {
	res.send('Symfero server');
});

app.use('/chat', chatRouter);
app.use('/auth', authRouter);
app.use('/message', messageRouter);

app.get('/env', (req, res) => {
	res.send('no data');
});

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Symfero server created serving only ${process.env.CLIENT_HOSTNAME}:${process.env.SERVER_PORT}`);
});
