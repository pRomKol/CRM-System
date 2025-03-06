import "./App.css";
import { TodoList } from "./pages/todoList/TodoList.tsx";
import { Route, Routes } from "react-router";
import {NavMenu} from "./components/navMenu/NavMenu.tsx";
import {LoginPage} from "./pages/login/LoginPage.tsx";
import {SignUpPage} from "./pages/signUp/signUpPage.tsx";
import {Profile} from "./pages/profile/Profile.tsx";



function App() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "250px", backgroundColor: "#f4f4f4", padding: "20px" }}>
                <NavMenu />
            </div>
            <div style={{ flex: 1, padding: "20px" }}>
                <Routes>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/signup' element={<SignUpPage/>}/>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/' element={<TodoList />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;