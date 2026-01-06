import { Outlet } from "react-router-dom";
import { TerminalIcon } from "../utils/icons";

export default function DesktopLayout({children}) {
	return (
		<div className="flex flex-col h-screen">
			<div className="w-full bg-dark-bg-200 flex items-center justify-between border-b-2 border-dark-bg-300">
				<h1 className="text-dark-primary-100 text-[40px]/[46px] font-[450] p-1.5">Symfero</h1>
				<div className="flex items-center gap-3">
					<div className="text-dark-primary-100 text-2xl hidden md:inline-block">{ sessionStorage.getItem('name') }</div>
					<div className="p-2 hover:text-dark-secondary-100">
						<TerminalIcon className="text-dark-primary-200 hover:text-dark-yellow-100 size-9 m-1"/>
					</div>
				</div>
			</div>
			<main className="flex flex-col grow">
				{/* {children} */}
				<Outlet />
			</main>
		</div>
	);
};