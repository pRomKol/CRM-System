import './task.scss';
import {Task} from "../task/Task.tsx";
import {TodoType} from "../main/Main.tsx";

type TasksListPropsType = {
    todos: TodoType[]
    getTodosByCurrentFilter:() => void
}


export const TasksList = (props: TasksListPropsType) => {
return (
        <ul className="task-list">
            {props.todos.map((todo) => (
                <Task
                    id={todo.id}
                    isDone={todo.isDone}
                    title={todo.title}
                    getTodosByCurrentFilter={props.getTodosByCurrentFilter} />
            ))}
        </ul>
    );
};