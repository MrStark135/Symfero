import { Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import DocsPage from './components/DocsPage'
import ErrorPage from './components/ErrorPage';
import DesktopLayout from './layouts/DesktopLayout';
import LoginPage from './components/LoginPage';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={ <LoginPage /> }/>
				<Route element={ <DesktopLayout /> }>
					<Route path="/chat" element={ <ChatPage /> }/>
					<Route path="/docs" element={ <DocsPage /> }/>
					<Route path="*" element={ <ErrorPage /> }/>
				</Route>
			</Routes>
	  	</div>
	);
};
 
export default App;