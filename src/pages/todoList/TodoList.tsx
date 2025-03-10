import {useState} from 'react';
import { useQuery } from 'react-query';
import { Header } from "../../components/header/Header.tsx";
import { Filters, FiltersType } from "../../components/filters/Filters.tsx";
import { Main } from "../../components/main/Main.tsx";
import { getTodos } from "../../features/todo.api.ts";
import {Link} from "react-router";

export const TodoList = () => {
    const [currentFilter, setCurrentFilter] = useState<FiltersType>('all');

    const { data, error, isLoading, refetch } = useQuery(
        ['todos', currentFilter],
        () => getTodos(currentFilter),
        {
            onError: () => {
                console.error('не пойдет', error);
            },
            refetchInterval: 5000,
        }
    );

    return (
        isLoading ? <div>КРУТИЛКА НА ВСЕ ЛИЦО</div> :
            <div>
                <Header getTodosByCurrentFilter={refetch} />
                <Filters
                    currentFilter={currentFilter}
                    info={data?.info}
                    setCurrentFilter={setCurrentFilter}
                />
                <Main getTodosByCurrentFilter={refetch}
                      todos={data?.data} />
                <Link to='/login'>qwrefegtwef</Link>
            </div>
    );
};
