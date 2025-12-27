// this route handles all user management paths

import express from "express";
import { addUser, allowSessionUser, matchUser } from "../services/userManagement.js"; 

const authRouter = express.Router();
export default authRouter;

authRouter.post('/login', async (req, res) => {
	const { data: findData, error: findError } = await matchUser(req.body, 'search');
	if (findError) res.send({ data: null, error: { label: findError.details, description: findError.message }});
	if (findData.length === 0) res.send({ data: null, error: { label: "Login error", description: "No user found with that name" }});
	
	const { data, error } = await matchUser(req.body, 'auth');
	let response = { data: null, error: null };
	if (data.length > 0) {
		response = await allowSessionUser(data[0]);
	} else {
		response.error = { label: "Login error", description: "Password incorrect for the provided name" };
	}
	res.send(response);
});

authRouter.post('/register', async (req, res) => {
	// check if name/email taken
	let findUserRes = await matchUser(req.body, 'search');
	if (findUserRes.data.length !== 0) {
		if(findUserRes.data[0].name === req.body.name)
			res.send({ data: null, error: { label: "Register error", description: "Name already taken" }});
		if(findUserRes.data[0].email === req.body.email)
			res.send({ data: null, error: { label: "Register error", description: "Email already registered" }});
	}
	// if valid, add user
	const { data, error } = await addUser({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	if (error !== null)
		res.send({ data: null, error: { label: error.details, description: error.message }});

	res.send({ data: data, error: null });
});