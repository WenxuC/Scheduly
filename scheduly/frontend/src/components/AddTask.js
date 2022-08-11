import React from 'react';
import { Link } from 'react-router-dom';
import addTask from './Task';
const AddTask = () => {
	return (
		<Link to='/tasks/new/'>
			<button onClick={addTask}>Add</button>
		</Link>
	);
};

export default AddTask;
