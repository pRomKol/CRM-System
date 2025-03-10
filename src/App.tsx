import "./App.css";
import {TodoList} from "./pages/todoList/TodoList.tsx";
import {Route, Routes} from "react-router";
import {NavMenu} from "./components/navMenu/NavMenu.tsx";
import {LoginPage} from "./pages/login/LoginPage.tsx";
import {SignUpPage} from "./pages/signUp/signUpPage.tsx";
import {Profile} from "./pages/profile/Profile.tsx";
import React from "react";

type PathType = {
    path: string
    element: React.ReactNode
}
function App() {
    const routs: PathType[] = [
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
            path: '/signup',
            element: <SignUpPage/>
        },
        {
            path: '/profile',
            element: <Profile/>
        },
        {
            path: '/',
            element: <TodoList/>
        },
    ]
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "250px", backgroundColor: "#f4f4f4", padding: "20px" }}>
                <NavMenu />
            </div>
            <div style={{ flex: 1, padding: "20px" }}>
                <Routes>
                    {routs.map((el, index)=>(
                        <Route path={el.path} element={el.element}/>
                    ))}
                </Routes>
            </div>
        </div>
    );
}

export default App;