import React, { useState, useEffect } from 'react';

const Task = ({ match, history }) => {
	let taskId = match.params.id;
	let [task, setTask] = useState(null);
	useEffect(() => {
		getTask();
	}, [taskId]);

	let getTask = async () => {
		if (taskId === 'new') return;

		let response = await fetch(`/api/tasks/${taskId}`);
		let data = await response.json();
		setTask(data);
	};

	let updateTask = async () => {
		fetch(`/api/tasks/${taskId}/update/`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
	};
	let deleteTask = async () => {
		fetch(`/api/tasks/${taskId}/delete/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		history.push('/');
	};
	let addTask = async () => {
		fetch(`/api/tasks/new/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
	};

	let handleSubmit = () => {
		if (taskId === 'new') {
			addTask();
		} else {
			updateTask();
		}
		history.push('/');
	};

	let handleTaskChange = value => {
		setTask(task => ({ ...task, description: value }));
	};
	let handleTitleChange = value => {
		setTask(task => ({ ...task, title: value }));
	};

	return (
		<div>
			<div>Title</div>
			<textarea
				onChange={e => {
					handleTitleChange(e.target.value);
				}}
				value={task?.title}
			></textarea>
			<div>Description</div>
			<textarea
				onChange={e => {
					handleTaskChange(e.target.value);
				}}
				value={task?.description}
			></textarea>
			<div>
				{taskId !== 'new' ? (
					<div>
						<button onClick={handleSubmit}>Done</button>
						<button onClick={deleteTask}>Delete</button>
					</div>
				) : (
					<button onClick={handleSubmit}>Done</button>
				)}
			</div>
		</div>
	);
};

export default Task;
