import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListView from './components/TaskListView';
import TaskFormView from './components/TaskFormView';
import TaskDetailView from './components/TaskDetailView';
import { getTasks, deleteTask, Task } from './services/taskService';


const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.taskId !== id));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskListView tasks={tasks} onDelete={handleDelete} />} />
                <Route path="/tasks/new" element={<TaskFormView onTaskChange={fetchTasks} />} />
                <Route path="/tasks/:id/edit" element={<TaskFormView onTaskChange={fetchTasks} />} />
                <Route path="/tasks/:id" element={<TaskDetailView />} />
            </Routes>
        </Router>
    );
};

export default App;
