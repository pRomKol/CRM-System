import "./App.css";
import {Header} from "./components/header/Header.tsx";
import {InfoType, Main, TodoType} from "./components/main/Main.tsx";
import {useEffect, useState} from "react";
import {getTodos} from "./features/todo.api.ts";
import {Filters} from "./components/filters/Filters.tsx";

export type FiltersType = 'inWork' | 'all' | 'completed'

function App() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [info, setInfo] = useState<InfoType>({all: 0, inWork: 0, completed: 0});
    const [currentFilter, setCurrentFilter] = useState<FiltersType>('all')
    const getTodosByCurrentFilter = () => {
        getTodos(currentFilter)
            .then((data) => {
                setInfo(data.info);
                setTodos(data.data);
            })
            .catch((error) => {
                console.error('Ошибка', error);
            }); }
    useEffect( ()=> getTodosByCurrentFilter(), []);
    return (
      <section style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Header getTodosByCurrentFilter={getTodosByCurrentFilter} />
          <Filters currentFilter={currentFilter} info={info} setTodos={setTodos} setCurrentFilter={setCurrentFilter}/>
          <Main getTodosByCurrentFilter={getTodosByCurrentFilter} todos={todos}/>
      </section>
    )

}

export default App;
