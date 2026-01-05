import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
	const savedCallback = useRef(callback);
	
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);
	
	useEffect(() => {
		if (delay === null) return;
		const id = setInterval(() => {
			savedCallback.current();
		}, delay);
		return () => clearInterval(id);
	}, [delay]);
}

// async function useInterval() {
// 	useEffect(() => {
// 		let interval = setInterval(async () => {
// 			await checkOnline();
// 		}, 3000);
// 		return () => clearInterval(interval);
// 	});
// }
