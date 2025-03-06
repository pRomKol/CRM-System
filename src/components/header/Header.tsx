import {Button} from "../button/Button.tsx";
import './header.scss';
import {useState} from "react";
import {addTodo} from "../../features/todo.api.ts";
import {TextInput} from "../input/TextInput.tsx";


type HeaderPropsType = {
    getTodosByCurrentFilter:() => void
};

export const Header = (props: HeaderPropsType) => {
    const [inputValue, setInputTitle] = useState<string>('');
    const [error, setError] = useState<null | string>(null)
    const addTodoHandler = async (isDone: boolean, title: string) => {
        try {
            if(title.length > 30){
                setError('МНОГА БУКАВ')
                return
            }else if(title.length < 1) {
                setError('ТЕПЕРЬ МАЛА БУКАВ')
            }
            else {
                await addTodo({isDone, title});
                props.getTodosByCurrentFilter()
                setInputTitle('');
            }
        } catch (error) {
            console.error("Ошибк", error);
        }
    };
const onChangeHandler = (title: string) => {
    setInputTitle(title)
    setError(null)
}
    return (
        <header className='header'>
            <TextInput value={inputValue}  onChange={onChangeHandler}/>
            <Button
                title='Add'
                onClick={() => addTodoHandler(false, inputValue)}
            />
            {error && <div>{error}</div>}
        </header>
    );
};