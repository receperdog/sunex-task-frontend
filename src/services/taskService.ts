import axios from 'axios';

export interface Task {
    taskId?: number;
    title: string;
    description?: string;
    completed: boolean;
}

const API_BASE_URL = 'http://localhost:5108/api/v1/Tasks';

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(API_BASE_URL);
    return response.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
    const response = await axios.post<Task>(API_BASE_URL, task);
    return response.data;
};

export const updateTask = async (id: number, task: Task): Promise<void> => {
    await axios.put(`${API_BASE_URL}/${id}`, task);
};

export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};
