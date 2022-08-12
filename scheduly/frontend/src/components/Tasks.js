import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTask from './AddTask';

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
			<div>
				{tasks.map((task, index) => (
					<Todo key={index} task={task}/>
				))}
			</div>
			<AddTask />
		</div>
	);
};

export default Tasks;
