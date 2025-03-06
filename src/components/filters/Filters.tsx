import { useQueryClient } from 'react-query';
import {InfoType } from "../main/Main.tsx";
import "./filters.scss";
export type FiltersType = 'inWork' | 'all' | 'completed';

type FilterPropsType = {
    info: InfoType;
    setCurrentFilter: (filter: FiltersType) => void;
    currentFilter: FiltersType;
};

export type FiltersListType = {
    name: string;
    filterName: FiltersType;
    length: number;
};

export const Filters = (props: FilterPropsType) => {
    const queryClient = useQueryClient();

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
        props.setCurrentFilter(filterName); // Устанавливаем текущий фильтр
        queryClient.invalidateQueries(['todos', filterName]); // Инвалидируем кэш для нового фильтра
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