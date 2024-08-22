import React, { useState, useEffect } from 'react';
import { createTask, updateTask, getTaskById, Task } from '../services/taskService';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Paper, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

interface TaskFormViewProps {
    onTaskChange: () => void;
}

const TaskFormView: React.FC<TaskFormViewProps> = ({ onTaskChange }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task>({ title: '', description: '', completed: false });

    useEffect(() => {
        if (id) {
            fetchTask(id);
        }
    }, [id]);

    const fetchTask = async (taskId: string) => {
        const data = await getTaskById(Number(taskId));
        setTask(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await updateTask(Number(id), task);
        } else {
            await createTask(task);
        }
        onTaskChange();  // Trigger a refresh of the task list
        navigate('/');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setTask({
                ...task,
                [name]: checked,
            });
        } else {
            setTask({
                ...task,
                [name]: value,
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {id ? 'Edit Task' : 'Create New Task'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        inputProps={{ style: { padding: '10px' } }}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={task.completed}
                                onChange={handleChange}
                                name="completed"
                                color="primary"
                            />
                        }
                        label="Completed"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Save
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default TaskFormView;
