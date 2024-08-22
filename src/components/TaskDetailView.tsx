import React, { useState, useEffect } from 'react';
import { getTaskById, Task } from '../services/taskService';
import { useParams } from 'react-router-dom';

const TaskDetailView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        if (id) {
            fetchTask();
        }
    }, [id]);

    const fetchTask = async () => {
        if (id) {
            const data = await getTaskById(Number(id));  // Convert id to number
            setTask(data);
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default TaskDetailView;
