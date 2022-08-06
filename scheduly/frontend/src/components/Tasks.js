import React, { useState, useEffect } from 'react';
import Todo from './Todo';

const Tasks = () => {
	let [tasks, setTasks] = useState([]);
	useEffect(() => {
		getTasks();
	}, []);

	let getTasks = async () => {
		let response = await fetch('/api/tasks/');
		let data = await response.json();
		setTasks(data);
	};
	return (
		<div>
			{tasks.map((task, index) => (
				<Todo key={index} task={task} />
			))}
		</div>
	);
};

export default Tasks;
