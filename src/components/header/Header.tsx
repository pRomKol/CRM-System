import {Button} from "../button/Button.tsx";
import {Input} from "../input/Input.tsx";
import './header.scss';
import  {useState} from "react";
import {addTodo, getTodos} from "../../features/todo.api.ts";
import {InfoType, TodoType} from "../main/Main.tsx";

type HeaderPropsType = {
    info: InfoType
    setInfo:(info: InfoType)=> void
    todos: TodoType[];
    setTodos: (todo: TodoType[])=>void
};

export const Header = (props: HeaderPropsType) => {
    const [inputValue, setInputTitle] = useState('');
    const addTodoHandler = async (isDone: boolean, title: string) => {
        try {
            await addTodo({isDone, title});
            const data = await getTodos('all')
            props.setTodos(data.data)
            props.setInfo(data.info)
            setInputTitle('');
        } catch (error) {
            console.error("Ошибк", error);
        }
    };

    return (
        <header className='header'>
            <Input value={inputValue}  onChange={setInputTitle}/>
            <Button
                reqType='submit'
                buttonType='add-button'
                title='Add'
                onClick={() => addTodoHandler(false, inputValue)}
            />
        </header>
    );
};