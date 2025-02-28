import { getTodos } from "../../features/todo.api.ts";
import { InfoType, TodoType } from "../main/Main.tsx";
import { FiltersType } from "../../App.tsx";
import "./filters.scss";

type FilterPropsType = {
    info: InfoType;
    setTodos: (todo: TodoType[]) => void;
    setCurrentFilter: (filter: FiltersType) => void;
    currentFilter: FiltersType;
};
type FiltersListType = {
    name: string;
    filterName: FiltersType;
    length: number
}
export const Filters = (props: FilterPropsType) => {
    const filtersList: FiltersListType[] = [
        {
            name: 'Все',
            filterName: 'all',
            length: props.info.all,
        },
        {
            name: 'В работе',
            filterName: 'inWork',
            length: props.info.inWork,
        },
        {
            name: 'Сделано',
            filterName: 'completed',
            length: props.info.completed,
        },
    ];

    const changeFilter = (filterName: FiltersType) => {
        getTodos(filterName).then((data) => props.setTodos(data.data));
        props.setCurrentFilter(filterName);
    };

    return (
        <ul className='filters'>
            {filtersList.map((el, index) => (
                <li
                    key={index}
                    onClick={() => changeFilter(el.filterName)}
                    className={`${props.currentFilter === el.filterName ? 'active' : ''}`}
                >
                    {el.name} ({el.length})
                </li>
            ))}
        </ul>
    );
};
