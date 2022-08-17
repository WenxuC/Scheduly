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

	let start_time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	let end_time, start_date, end_date
	if (task !== null){
		let date = new Date(task.start_time)
		start_time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
		start_date = date.getMonth() + '/' + date.getDate()+ '/' + date.getFullYear()
		if (task.end_time !== null){
			date = new Date(task.end_time)
			end_time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
			end_date = date.getMonth() + '/' + date.getDate()+ '/' + date.getFullYear()
		}else{
			date = new Date(task.start_time)
			end_time = date.setHours(date.getHours() + 1)
			end_time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
			end_date = date.getMonth() + '/' + date.getDate()+ '/' + date.getFullYear()
		}
	}
	return (
		<div>
			<div>Start: {start_date} - {start_time}</div>
			<div>End: {end_date} - {end_time}</div>
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
						<form>
							<input type="checkbox" id="daily" name='daily' value="Daily"></input>
							<label htmlFor="daily">Daily</label>
							<input type="checkbox" id="weekly" name='weekly' value="Weekly"></input>
							<label htmlFor="weekly">Weekly</label>
							<input type="checkbox" id="monthly" name='monthly' value="Monthly"></input>
							<label htmlFor="monthly">Monthly</label>
						</form>
						<button onClick={handleSubmit}>Done</button>
						<button onClick={deleteTask}>Delete</button>
					</div>
				) : (
					<div>
						<form>
								<input type="checkbox" id="daily" name='daily' value="Daily"></input>
								<label htmlFor="daily">Daily</label>
								<input type="checkbox" id="weekly" name='weekly' value="Weekly"></input>
								<label htmlFor="weekly">Weekly</label>
								<input type="checkbox" id="monthly" name='monthly' value="Monthly"></input>
								<label htmlFor="monthly">Monthly</label>
						</form>
						<button onClick={handleSubmit}>Done</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Task;
