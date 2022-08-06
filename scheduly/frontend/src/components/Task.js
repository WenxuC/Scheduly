import React, { useState, useEffect } from 'react';

const Task = ({ match, history }) => {
	let taskId = match.params.id;
	let [task, setTask] = useState(null);
	useEffect(() => {
		getTask();
	}, [taskId]);

	let getTask = async () => {
		let response = await fetch(`/api/tasks/${taskId}`);
		let data = await response.json();
		setTask(data);
	};

	let updateTask = async () => {
		fetch(`/api/tasks/${taskId}/update`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
	};
	let deleteTask = async () => {
		fetch(`/api/tasks/${taskId}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		history.push('/');
	};
	let addTask = async () => {
		fetch(`/api/tasks/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
	};

	let handleSubmit = () => {
		updateTask();
		history.push('/');
	};

	let handleChange = value => {
		setTask(task => ({ ...task, description: value }));
	};

	return (
		<div>
			<textarea
				onChange={e => {
					handleChange(e.target.value);
				}}
				value={task?.description}
			></textarea>
			<div>
				{taskId !== 'new' ? (
					<button onClick={deleteTask}>Delete</button>
				) : (
					<button onClick={handleSubmit}>Done</button>
				)}
			</div>
		</div>
	);
};

export default Task;
