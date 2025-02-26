import {useState} from 'react';
import {Input} from "../input/Input.tsx";
import {Button} from "../button/Button.tsx";
import {deleteTodo, updateTodo} from "../../features/todo.api.ts";


type TaskPropsType = {
    id: number
    isDone: boolean
    title: string | undefined
    getTodosByCurrentFilter: () => void
};

export const Task = (props: TaskPropsType) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState<string | undefined>('');
    const startEditing = (id: number, title: string | undefined) => {
        setEditingId(id);
        setEditedTitle(title);
    };
    const deleteTodoHandler = async (id: number) => {
            try {
                await deleteTodo(id);
                props.getTodosByCurrentFilter()
            } catch (error) {
                console.error("чет не то", error);
            }
        };
        const refactorTodoHandler = async (id: number, title: string | undefined, isDone: boolean) => {
            try {
                await updateTodo(id, {isDone, title})
                props.getTodosByCurrentFilter()
            } catch (error) {
                console.error('та за шо', error)
            }
            setEditingId(null);
            setEditedTitle('')
        }
    return (
        <li key={props.id} className="todo-item">
            <input onChange={() => refactorTodoHandler(props.id, props.title, !props.isDone)} checked={props.isDone}
                   type="checkbox"/>
            <div onDoubleClick={() => startEditing(props.id, props.title)}>
                {editingId === props.id ? (
                    <Input
                        value={editedTitle}
                        onChange={setEditedTitle}
                        onBlur={() => refactorTodoHandler(props.id, editedTitle, props.isDone,)}
                    />
                ) : (
                    <h3>{props.title}</h3>
                )}
            </div>
            <div className="buttons">
                {!editingId ? (
                    <Button
                        buttonType='refactor'
                        title='+'
                        onClick={() => startEditing(props.id, props.title)}
                    />
                ) : editingId === props.id ? null : <Button
                    buttonType='refactor'
                    title='+'
                    onClick={() => startEditing(props.id, props.title)}
                />
                }
                {editingId === props.id ?
                    <>
                        <Button buttonType='refactor' title='save' onClick={() => refactorTodoHandler(props.id, editedTitle, props.isDone)} />
                        <Button buttonType='refactor' title='cancel' onClick={() => refactorTodoHandler(props.id, props.title, props.isDone)} />
                    </> : null }

                <Button buttonType='delete' title='X' onClick={() => deleteTodoHandler(props.id)} />
            </div>
        </li>
    );
};

