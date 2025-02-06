import './task.scss';
import React from "react";
import {TodoType} from "../main/Main.tsx";
import {deleteTodo} from "../../features/todo.api.ts";
import {Button} from "../button/Button.tsx";

type TaskPropsType = {
    todos: TodoType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const Task = (props: TaskPropsType) => {
    const deleteTodoHandler = async (id: number) => {
        try {
            await deleteTodo(id);
            props.setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
        }
    };
    const refactorTodoHandler = (id: number) => {

    };
    return (
        <ul className="task-list">
            {props.todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                    <input checked={todo.isDone} type="checkbox"/>
                    <h3>{todo.title}</h3>
                    <Button buttonType='delete' title='Удалить' onClick={() => deleteTodoHandler(todo.id)}/>
                    <Button buttonType='refactor' title='Рефакторинг' onClick={() => refactorTodoHandler(todo.id)}/>
                </li>
            ))}
        </ul>
    );
};