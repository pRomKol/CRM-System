import axios from 'axios';

const baseURL = 'https://easydev.club/api/v1';

export async function addTodo(todoRequest: any): Promise<any> {
    const response = await axios.post(`${baseURL}/todos`, todoRequest);
    return response.data;
}

export async function updateTodo(id: number, todoRequest: any):Promise<any>  {
    const response = await axios.put(`${baseURL}/todos/${id}`, todoRequest);
    return response.data;
}

export async function deleteTodo(id: number):Promise<any> {
    const response = await axios.delete(`${baseURL}/todos/${id}`);
    return response.data;
}
export async function getTodos(filter = 'all'):Promise<any> {
    const response = await axios.get(`${baseURL}/todos`, { params: { filter } });
    return response.data;
}