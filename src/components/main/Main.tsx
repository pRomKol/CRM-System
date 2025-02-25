import './main.scss';
import { Task } from "../task/Task.tsx";
import { getTodos } from "../../features/todo.api.ts";
import React, { useEffect } from 'react';

export type TodoType = {
    title?: string;
    id: number;
    isDone: boolean;
};

export type InfoType = {
    all: number;
    completed: number;
    inWork: number;
}

type MainSectionPropsType = {
    info: InfoType;
    todos: TodoType[];
    setTodos: (todo: TodoType[]) => void;
    setInfo: (info: InfoType) => void;
};

export const Main = (props: MainSectionPropsType) => {
    useEffect(() => {
        getTodos('all')
            .then((data) => {
                props.setInfo(data.info);
                props.setTodos(data.data);
            })
            .catch((error) => {
                console.error('Ошибка', error);
            });
    }, [props.setTodos]);

    const filtersList = [{
        name: 'Все',
        length: props.info.all
    }, {
        name: 'В работе',
        length: props.info.inWork
    }, {
        name: 'Сделано',
        length: props.info.completed
    }];

    const changeFilter = (filterName: string) => {
        if (filterName === 'В работе') {
            getTodos('inWork').then((data) => props.setTodos(data.data));
        } else if (filterName === 'Сделано') {
            getTodos('completed').then((data) => props.setTodos(data.data));
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
            <Task info={props.info} setInfo={props.setInfo} setTodos={props.setTodos} todos={props.todos} />
        </>
    );
};