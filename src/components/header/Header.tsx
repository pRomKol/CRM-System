import {Button} from "../button/Button.tsx";
import {Input} from "../input/Input.tsx";
import './header.scss';
import React, {useState} from "react";
import {addTodo} from "../../features/todo.api.ts";
import {TodoType} from "../main/Main.tsx";

type HeaderPropsType = {
    todos: TodoType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const Header = (props: HeaderPropsType) => {
    const [inputValue, setInputTitle] = useState('');

    const addTodoHandler = async (isDone: boolean, title: string) => {
        try {
            const newTodo = await addTodo({isDone, title});
            setInputTitle('');
            props.setTodos([...props.todos, newTodo]);
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
        }
    };

    return (
        <header className='header'>
            <Input value={inputValue} setInputValue={setInputTitle}/>
            <Button
                reqType='submit'
                buttonType='add-button'
                title='Add'
                onClick={() => addTodoHandler(false, inputValue)}
            />
        </header>
    );
};