import "./App.css";
import {Header} from "./components/header/Header.tsx";
import {InfoType, Main, TodoType} from "./components/main/Main.tsx";
import {useState} from "react";


function App() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [info, setInfo] = useState<InfoType>({all: 0, inWork: 0, completed: 0});
    return (
      <section style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Header info={info} setInfo={setInfo} todos={todos} setTodos={setTodos}/>
          <Main info={info}  setInfo={setInfo}  todos={todos}  setTodos={setTodos}/>
      </section>
    )

}

export default App;
