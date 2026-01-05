import { useEffect, useRef, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { validateName, validateEmail, validatePassword } from "../utils/validators";
import requestServer from "../utils/request";

const actions = Object.freeze({
	LOGIN: "Login",
	REGISTER: "Register"
});

export default function LoginPage() {

	const [errorsName, setErrorsName] = useState(Array({}));
	const [errorsEmail, setErrorsEmail] = useState(Array({}));
	const [errorsPassword, setErrorsPassword] = useState(Array({}));
	const [errorsLogin, setErrorsLogin] = useState(Array({}));
	const [canLogin, setCanLogin] = useState({ name: false, email: false, password: false });
	const [currentAction, setCurrentAction] = useState(actions.LOGIN);
	
	const errorsContainer = useRef(null);
	const inputName = useRef(null);
	const inputEmail = useRef(null);
	const inputPassword = useRef(null);
	const button = useRef(null);

	const navigate = useNavigate();
	
	async function login(name, password) {
		const { data, error } = await requestServer('/auth/login', 'POST', { name: name, password: password });
		if (data !== null)
		{
			if (data[0].sessionAllowed === true) {
				sessionStorage.setItem('session', data[0].session);
				sessionStorage.setItem('name', data[0].name);
				sessionStorage.setItem('email', data[0].email);
				sessionStorage.setItem('id', data[0].id);
				navigate('/chat?session='+data[0].session);
			}
		}
		return { error };
	}
		
	async function register(name, email, password) {
		const { data, error } = await requestServer('/auth/register', 'POST', { name: name, email: email, password: password });
		return { data, error };
	}

	useEffect(() => {
		errorsContainer.current.scroll(0, 999999999); // dirty little trick, looks bad, but will work 99.99999% of the time
	}, [errorsName, errorsEmail, errorsPassword]);
	
	return (
		<div className="flex flex-col md:h-screen h-dvh">
			<div className="bg-dark-bg-100 grow flex flex-col items-stretch">
				<div className="text-dark-primary-200 h-1/4 bg-dark-bg-300 flex justify-center md:justify-start">
					<div className="md:w-1/12"></div>
					<div className="gap-4 flex flex-col justify-center items-stretch">
						<div className="md:text-7xl text-6xl">Symfero...</div>
						<div className="text-xl pl-2">A simple messenger web app</div>
					</div>
				</div>
				<div className="text-2xl text-dark-primary-200 p-2 border-[3px] gap-2 rounded-md flex flex-col items-center border-dark-bg-300 m-2">
					<input ref={inputName} className="focus:outline-none bg-dark-bg-200 w-full rounded-sm p-2" type="text"
						onChange={
							(event) => {
								let errors = validateName(event.target.value);
								setErrorsName(errors);
								setCanLogin({ ...canLogin, name: errors.length > 0 ? false : true });
							}
						}
						placeholder="Insert username" />
					{
						currentAction === "Register" ?
						(
							<input ref={inputEmail} className="focus:outline-none bg-dark-bg-200 w-full rounded-sm p-2" type="text"
								onChange={
									(event) => {
										let errors = validateEmail(event.target.value);
										setErrorsEmail(errors);
										setCanLogin({ ...canLogin, email: errors.length > 0 ? false : true });
									}
								}
							placeholder="Insert email" />
						) : (<></>)
					}
					<input ref={inputPassword} className="focus:outline-none bg-dark-bg-200 w-full rounded-sm p-2" type="text"
						onChange={
							(event) => {
								let errors = validatePassword(event.target.value);
								setErrorsPassword(errors);
								setCanLogin({ ...canLogin, password: errors.length > 0 ? false : true });
							}
						}
						placeholder="Insert password" />
				</div>
				<div className="grow relative">
					<div ref={errorsContainer} className="absolute overflow-auto top-0 bottom-0 right-0 left-0 bg-dark-bg-200 border-[3px] rounded-md mx-2 border-dark-bg-300 text-dark-red-200 p-1.5">
						{
							(() => {								
								let errors = [];
								let key = 0;
								errorsName.map((error, idx) => {
									if (!error?.label || !error?.description) return;
									errors.push(
										<div className="flex text-nowrap" key={key}>
											<div className="font-bold underline">{error.label} </div>
											<div>&nbsp;- {error.description}</div>
										</div>);
									key++;
								});
								errorsEmail.map((error, idx) => {
									if (!error?.label || !error?.description) return;
									errors.push(
										<div className="flex text-nowrap" key={key}>
											<div className="font-bold underline">{error.label} </div>
											<div>&nbsp;- {error.description}</div>
										</div>);
									key++;
								});
								errorsPassword.map((error, idx) => {
									if (!error?.label || !error?.description) return;
									errors.push(
										<div className="flex text-nowrap" key={key}>
											<div className="font-bold underline">{error.label} </div>
											<div>&nbsp;- {error.description}</div>
										</div>);
									key++;
								});
								errorsLogin.map((error) => {
									if (!error?.label || !error?.description) return;
									errors.push(
										<div className="flex text-nowrap" key={key}>
											<div className="font-bold underline">{error.label} </div>
											<div>&nbsp;- {error.description}</div>
										</div>);
									key++;
								})
								return errors.length > 0 ? errors : <div className="text-amber-300">No errors found...</div>;
							})()
						}
					</div>
				</div>
				<div className="flex">
					<button tabIndex={0} ref={button} className={
						(() => {
							const baseStyles = "grow text-5xl rounded-md p-5 text-center bg-dark-bg-300 m-2 border-[3px] border-dark-bg-300 ";
							let stateStyles = "";

							let canLoginSum = false;
							switch(currentAction) {
								case "Login": {
									if (canLogin.name && canLogin.password) canLoginSum = true;
									break;	
								}
								case "Register": {
									if (canLogin.name && canLogin.email && canLogin.password) canLoginSum = true;
									break;
								}
								default: {
									canLoginSum = false;
									break;
								}
							}

							// console.log(currentAction, "= currentAction");

							if (canLoginSum) {
								stateStyles = "text-dark-primary-200 hover:text-dark-secondary-100 focus:outline-none hover:border-dark-secondary-100 focus:text-dark-secondary-100 focus:border-dark-secondary-100";
							} else {
								stateStyles = "text-dark-yellow-100 hover:text-dark-red-100 hover:border-dark-red-100 focus:outline-none focus:text-dark-red-100 focus:border-dark-red-100";
							}
							
							return baseStyles + stateStyles;
						})()}
						onClick={
						async (event) => {
							event.preventDefault();

							if (currentAction === actions.REGISTER) {
								if (canLogin.name && canLogin.email && canLogin.password) {
									try {
										const { error } = await register(inputName.current.value, inputEmail.current.value, inputPassword.current.value);
										console.log(error);
										setErrorsLogin([ error ]);
										if (error === null){
											setCurrentAction(actions.LOGIN);
											event.target.innerText = actions.LOGIN;
										}
									} catch(error) {
										console.error(error);
									}
								}
							} else if (currentAction === actions.LOGIN) {
								if (canLogin.name && canLogin.password) {
									try {
										const { error } = await login(inputName.current.value, inputPassword.current.value);
										// if not redirected, then proceed here - login unsuccessful
										setErrorsLogin([ error ]);
										if (error !== null && error.description === "No user found with that name") {
											setCurrentAction(actions.REGISTER);
											event.target.innerText = actions.REGISTER;
										}
									} catch(error) {
										console.error(error);
									}
								}
							}
						}}>
						Login
					</button>
				</div>
			</div>
			<script>

			</script>
		</div>
	);
}