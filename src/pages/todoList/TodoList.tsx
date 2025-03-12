import { useState } from 'react';
import { useQuery } from 'react-query';
import { AddTask } from "../../components/addTask/AddTask.tsx";
import { TodoContent } from "../../components/todoContent/TodoContent.tsx";
import { getTodos } from "../../api/todo.api.ts";
import { Filters } from "../../types/filters.ts";
import { TodoFiltersList } from "../../components/filters/TodoFiltersList.tsx";
import { notification } from "antd";
import {TodoApiResponse} from "../../types/todos.ts";


export const TodoList = () => {
    const [currentFilter, setCurrentFilter] = useState<Filters>('all');

    const { data, isLoading, refetch } = useQuery<TodoApiResponse>(
        ['todos', currentFilter],
        () => getTodos(currentFilter),

        {
            onError: (error) => {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            },
            refetchInterval: 5000,
        }
    );

    if (isLoading) {
        return <div>'Loader component'</div>;
    }

    return (
        <div>
            <AddTask getTodosByCurrentFilter={refetch} />
            <TodoFiltersList
                currentFilter={currentFilter}
                info={data?.info}
                setCurrentFilter={setCurrentFilter}
            />
            <TodoContent
                getTodosByCurrentFilter={refetch}
                todos={data?.data}
            />
        </div>
    );
};