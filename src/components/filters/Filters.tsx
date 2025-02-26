import {getTodos} from "../../features/todo.api.ts";
import {InfoType, TodoType} from "../main/Main.tsx";
import {FiltersType} from "../../App.tsx";

type FilterPropsType = {
    info: InfoType
    setTodos:(todo: TodoType[]) => void
    setCurrentFilter:(filter: FiltersType) => void
}
export const Filters = ( props: FilterPropsType) => {
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
            props.setCurrentFilter('inWork')
        } else if (filterName === 'Сделано') {
            getTodos('completed').then((data) => props.setTodos(data.data));
            props.setCurrentFilter('completed')
        } else {
            getTodos('all').then((data) => props.setTodos(data.data));
            props.setCurrentFilter('all')
        }
    };
    return (
        <ul className='filters'>
            {filtersList.map((el, index) => (
                <li onClick={() => changeFilter(el.name)} key={index} className='item'>
                    {el.name} ({el.length})
                </li>
            ))}
        </ul>
    )

}