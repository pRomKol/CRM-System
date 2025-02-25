import './task.scss';
import React, {useState} from "react";
import {InfoType, TodoType} from "../main/Main.tsx";
import {deleteTodo, getTodos, updateTodo} from "../../features/todo.api.ts";
import {Button} from "../button/Button.tsx";
import {Input} from "../input/Input.tsx";

type TaskPropsType = {
    setInfo: (info: InfoType) => void
    info: InfoType
    todos: TodoType[];
    setTodos:(todo: TodoType) => void
};

export const Task = (props: TaskPropsType) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const deleteTodoHandler = async (id: number) => {
        try {
            await deleteTodo(id);
            const data = await getTodos('all')
            props.setInfo(data.info)
            props.setTodos(data.data)

        } catch (error) {
            console.error("чет не то", error);
        }
    };
    const refactorTodoHandler = async (id: number, title: string | undefined, isDone: boolean) => {
        try {
            await updateTodo(id, {isDone, title})
            const data = await getTodos('all')
            props.setInfo(data.info);
            props.setTodos(data.data)
        }
        catch (error){
            console.error ('та за шо', error)
        }
        setEditingId(null);
        setEditedTitle('')
    }

    const startEditing = (id: number, title: string) => {
        setEditingId(id);
        setEditedTitle(title);
    };



    return (
        <ul className="task-list">
            {props.todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                    <input onChange={() => refactorTodoHandler(todo.id, todo.title, !todo.isDone)} checked={todo.isDone}
                           type="checkbox"/>
                    <div onDoubleClick={() => startEditing(todo.id, todo.title)}>
                        {editingId === todo.id ? (
                            <Input
                                value={editedTitle}
                                onChange={setEditedTitle}
                                onBlur={() => refactorTodoHandler(todo.id, editedTitle, todo.isDone,)}
                            />
                        ) : (
                            <h3>{todo.title}</h3>
                        )}
                    </div>
                    <div className="buttons">
                        <Button buttonType='delete' title='X' onClick={() => deleteTodoHandler(todo.id)}/>
                        <Button
                            buttonType='refactor'
                            title='+'
                            onClick={() => startEditing(todo.id, todo.title)}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};