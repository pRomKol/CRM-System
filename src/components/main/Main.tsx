import './main.scss';
import { Task } from "../task/Task.tsx";
import { getTodos } from "../../features/todo.api.ts";
import React, { useEffect } from 'react';

export type TodoType = {
    title?: string;
    id: number;
    isDone: boolean;
};

type filterList = {
    name: string;
    length: number;
};

type MainSectionPropsType = {
    todos: TodoType[];
    setTodos: (todo: TodoType[]) => void;
};

export const Main = (props: MainSectionPropsType) => {
    const completedTodos = props.todos.filter(el => el.isDone).length;
    const inWorkTodos = props.todos.filter(el => !el.isDone).length;

    const filtersList: filterList[] = [
        {
            name: 'Все',
            length: props.todos.length
        },
        {
            name: 'В работе',
            length: inWorkTodos
        },
        {
            name: 'Сделано',
            length: completedTodos
        }
    ];

    useEffect(() => {
        getTodos('all')
            .then((data) => {
                props.setTodos(data.data);
            })
            .catch((error) => {
                console.error('Ошыыыв', error);
            });
    }, [props.setTodos]);

    const changeFilter = (filterName: string) => {
        if (filterName === 'В работе') {
            const inWorkTasks = props.todos.filter(task => !task.isDone);
            props.setTodos(inWorkTasks);
        } else if (filterName === 'Сделано') {
            const completedTasks = props.todos.filter(task => task.isDone);
            props.setTodos(completedTasks);
        } else {
            getTodos('all').then((data) => props.setTodos(data.data));
        }
    };

    return (
        <>
            <ul className='filters'>
                {filtersList.map((el, index) => (
                    <li onClick={() => changeFilter(el.name)} key={index} className='item'>
                        {el.name} ({el.length})
                    </li>
                ))}
            </ul>
            <Task setTodos={props.setTodos} todos={props.todos} />
        </>
    );
};