import {Button} from "../button/Button.tsx";
import {Input} from "../input/Input.tsx";
import './header.scss';
import {useState} from "react";
import {addTodo} from "../../features/todo.api.ts";


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
            }else {
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
            <Input value={inputValue}  onChange={onChangeHandler}/>
            <Button
                reqType='submit'
                buttonType='add-button'
                title='Add'
                onClick={() => addTodoHandler(false, inputValue)}
            />
            {error && <div>{error}</div>}
        </header>
    );
};