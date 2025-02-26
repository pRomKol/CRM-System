import './main.scss';
import {TasksList} from "../tasksList/TasksList.tsx";

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
    todos: TodoType[];
    getTodosByCurrentFilter: () => void
};

export const Main = (props: MainSectionPropsType) => {
    return (
        <>
            <TasksList
                todos={props.todos}
                getTodosByCurrentFilter={props.getTodosByCurrentFilter}/>
        </>
    );
};