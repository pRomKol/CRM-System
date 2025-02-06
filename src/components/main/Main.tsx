import './main.scss'
import {Task} from "../task/Task.tsx";
import {getTodos} from "../../features/todo.api.ts";
import React, {useEffect} from 'react';

type TodoResponseType = {
    id: number;
    title: string;
    created: string;
    isDone: boolean;
}

type MainSectionPropsType = {
    listLength: number;
    todos: TodoType[]
    setTodos: (data: TodoResponseType[]) => void
};
export type TodoType = {
    title?: string
    id: number
    isDone: boolean
}

export const Main = (props: MainSectionPropsType) => {
    const filtersList: string[] = ['Все', 'В работе', 'Сделано'];

    useEffect(() => {
        getTodos('all')
            .then((data) => {
                props.setTodos(data.data);
            })
            .catch((error) => {
                console.error('Ы', error);
            });
    }, []);
    return (
        <>
            <ul className='filters'>
                {filtersList.map((el, index) => (
                    <li key={index} className='item'>
                        {el}
                        {props.listLength}
                    </li>
                ))}
            </ul>
            <Task setTodos={props.setTodos} todos={props.todos}/>
        </>
    );
};