import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../services/taskService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Container, Typography, Box, Button, Paper, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskListViewProps {
    tasks: Task[];
    onDelete: (id: number) => void;
}

const TaskListView: React.FC<TaskListViewProps> = ({ tasks, onDelete }) => {
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
        </Container>
    );
};

export default TaskListView;
