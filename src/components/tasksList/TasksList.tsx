import './task.scss';
import {Task} from "../task/Task.tsx";
import {Todo} from "../../types/todos.ts";


type TasksListProps = {
    todos: Todo[]
    getTodosByCurrentFilter:() => void
}


export const TasksList = (props: TasksListProps) => {
return (
        <ul className="task-list">
            {props.todos.map((todo, index) => (
                <Task
                    id={todo.id}
                    isDone={todo.isDone}
                    title={todo.title}
                    getTodosByCurrentFilter={props.getTodosByCurrentFilter} />
            ))}
        </ul>
    );
};