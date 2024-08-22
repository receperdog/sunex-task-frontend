import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../services/taskService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Container, Typography, Button, Paper, List, ListItem, ListItemIcon, ListItemText, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import connection from '../services/signalRConnection';

interface TaskListViewProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onRefresh: () => void;
}

const TaskListView: React.FC<TaskListViewProps> = ({ tasks, onDelete, onRefresh }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        connection.on('TaskAdded', (message) => {
            setSnackbarMessage('A new task has been added!');
            setSnackbarOpen(true);
            onRefresh(); // Re-fetch the task list
            console.log('Task Added Notification:', message);
        });

        connection.on('TaskDeleted', (taskId) => {
            setSnackbarMessage('A task has been deleted.');
            setSnackbarOpen(true);
            onRefresh(); // Re-fetch the task list
            console.log('Task Deleted Notification:', taskId);
        });

        connection.on('TaskUpdated', (message) => {
            setSnackbarMessage('A task has been updated.');
            setSnackbarOpen(true);
            onRefresh(); // Re-fetch the task list
            console.log('Task Updated Notification:', message);
        });

        // Clean up the effect
        return () => {
            connection.off('TaskAdded');
            connection.off('TaskDeleted');
            connection.off('TaskUpdated');
        };
    }, [onRefresh]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Task List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/tasks/new"
                    style={{ marginBottom: '20px' }}
                >
                    Create New Task
                </Button>
                <List>
                    {tasks.length === 0 ? (
                        <Typography variant="body1" color="textSecondary">
                            No tasks available. Create a new task to get started!
                        </Typography>
                    ) : (
                        tasks.map((task) => (
                            <ListItem key={task.taskId} style={{ marginBottom: '10px' }} component={Link} to={`/tasks/${task.taskId}/edit`} button>
                                <ListItemIcon>
                                    {task.completed ? (
                                        <CheckCircleIcon style={{ color: 'green' }} />
                                    ) : (
                                        <RadioButtonUncheckedIcon style={{ color: 'red' }} />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={task.title}
                                    secondary={task.completed ? 'Completed' : 'Not Completed'}
                                />
                                <IconButton edge="end" aria-label="delete" onClick={(e) => {
                                    e.preventDefault();
                                    task.taskId && onDelete(task.taskId);
                                }}>
                                    <DeleteIcon style={{ color: 'red' }} />
                                </IconButton>
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default TaskListView;
