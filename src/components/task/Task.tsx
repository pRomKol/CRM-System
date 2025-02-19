import './task.scss';
import React, { useState } from "react";
import { TodoType } from "../main/Main.tsx";
import {deleteTodo, updateTodo} from "../../features/todo.api.ts";
import { Button } from "../button/Button.tsx";
import { Input } from "../input/Input.tsx";

type TaskPropsType = {
    todos: TodoType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const Task = (props: TaskPropsType) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const deleteTodoHandler = async (id: number) => {
        try {
            await deleteTodo(id);
            props.setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("чет не то", error);
        }
    };
    const refactorTodoHandler = async (id: number, title: string | undefined, isDone: boolean) => {
        try {
            await updateTodo(id, {isDone, title})
        }
        catch (error){
            console.error ('та за шо', error)
        }
        props.setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, title: editedTitle ? editedTitle : title , isDone } : todo
            )
        );
        setEditingId(null);
        setEditedTitle('')
    }

    const startEditing = (id: number, title: string) => {
        setEditingId(id);
        setEditedTitle(title);
    };

    const saveEditing = (id: number) => {

    };

    return (
        <ul className="task-list">
            {props.todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                    <input  onChange={() => refactorTodoHandler(todo.id, todo.title, !todo.isDone)} checked={todo.isDone} type="checkbox" />
                    <div onDoubleClick={() => startEditing(todo.id, todo.title)}>
                        {editingId === todo.id ? (
                            <Input
                                value={editedTitle}
                                onChange={setEditedTitle}
                                onBlur={() => refactorTodoHandler(todo.id, editedTitle, todo.isDone,)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        saveEditing(todo.id);
                                    }
                                }}
                            />
                        ) : (
                            <h3>{todo.title}</h3>
                        )}
                    </div>
                    <Button buttonType='delete' title='X' onClick={() => deleteTodoHandler(todo.id)} />
                    <Button
                        buttonType='refactor'
                        title='+'
                        onClick={() => startEditing(todo.id, todo.title)}
                    />
                </li>
            ))}
        </ul>
    );
};