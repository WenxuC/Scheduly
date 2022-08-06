import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components
import Header from './components/Header';
import Tasks from './components/Tasks';
import Task from './components/Task';

function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<Route path='/' exact component={Tasks} />
				<Route path='/tasks/:id' component={Task} />
			</div>
		</Router>
	);
}

export default App;
