import React from 'react';
import { Link } from 'react-router-dom';

const Todo = ({ task }) => {

	return (
		<Link to={`/tasks/${task.id}`}>
			<div className='notes-list-item'>
				<p>{task.start_time} -- {task.title}</p>
			</div>
		</Link>
	);
};

export default Todo;
