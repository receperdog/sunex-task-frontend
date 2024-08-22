import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { deleteTask, getTasks, Task } from './services/taskService';
import TaskListView from './components/TaskListView';
import TaskFormView from './components/TaskFormView';
import TaskDetailView from './components/TaskDetailView';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.taskId !== id));
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={<TaskListView tasks={tasks} onDelete={handleDelete} onRefresh={fetchTasks} />}
            />
            <Route
                path="/tasks/new"
                element={<TaskFormView onTaskChange={fetchTasks} />}
            />
            <Route
                path="/tasks/:id/edit"
                element={<TaskFormView onTaskChange={fetchTasks} />}
            />
            <Route
                path="/tasks/:id"
                element={<TaskDetailView />}
            />
        </Routes>
    );
};

export default App;
