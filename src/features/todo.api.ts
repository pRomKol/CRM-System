import axios from 'axios';
import {AddTodoRequestType} from "./todo.api.types.ts";

const baseURL = 'https://easydev.club/api/v1';

export async function addTodo(addTodoData: AddTodoRequestType): Promise<any> {
    const response = await axios.post(`${baseURL}/todos`,addTodoData);
    return response.data;
}

export async function updateTodo(id: number, title: string):Promise<any>  {
    const response = await axios.put(`${baseURL}/todos/${id}`, title);
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