import React from 'react';
import { Link } from 'react-router-dom';


const Todo = ({ task }) => {
	let date = new Date(task.start_time)
	let date_format = date.getMonth() + '/' + date.getDate()+ '/' + date.getFullYear()
	return (
		<Link to={`/tasks/${task.id}`}>
			<div className='task-list-item'>
				<p>
					{date_format} -- {task.title}
				</p>
			</div>
		</Link>
	);
};

export default Todo;
