import "./App.css";
import {Header} from "./components/header/Header.tsx";
import {Main, TodoType} from "./components/main/Main.tsx";
import {useState} from "react";


function App() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    return (
      <section style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Header todos={todos} setTodos={setTodos}/>
          <Main  todos={todos}  setTodos={setTodos}/>
      </section>
    )

}

export default App;
