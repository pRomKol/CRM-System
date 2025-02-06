import axios from 'axios';

const baseURL = 'https://easydev.club/api/v1';

export async function addTodo(todoRequest) {
    const response = await axios.post(`${baseURL}/todos`, todoRequest);
    return response.data;
}

export async function updateTodo(id, todoRequest) {
    const response = await axios.put(`${baseURL}/todos/${id}`, todoRequest);
    return response.data;
}

export async function deleteTodo(id) {
    const response = await axios.delete(`${baseURL}/todos/${id}`);
    console.log('зпрос на удаление')
    return response.data;
}

export async function getTodoById(id) {
    const response = await axios.get(`${baseURL}/todos/${id}`);
    return response.data;
}

export async function getTodos(filter = 'all') {
    const response = await axios.get(`${baseURL}/todos`, { params: { filter } });
    return response.data;
}