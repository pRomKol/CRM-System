import { Button } from "../button/Button.tsx";
import './header.scss';
import { ChangeEvent, useState } from "react";
import { addTodo } from "../../features/todo.api.ts";
import { Input } from "antd";

type HeaderPropsType = {
    getTodosByCurrentFilter: () => void;
};

export const Header = (props: HeaderPropsType) => {
    const [inputValue, setInputTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTodoHandler = async (isDone: boolean, title: string) => {
        try {
            if (title.length < 2) {
                setError('МАЛА БУКАВ');
                return;
            } else if (title.length > 64) {
                setError('МНОГА БУКАВ (>64)');
                return;
            } else {
                await addTodo({ isDone, title });
                props.getTodosByCurrentFilter();
                setInputTitle('');
                setError(null);
            }
        } catch (error) {
            console.error("Ошибка при добавлении задачи", error);
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
        setError(null);
    };

    return (
        <header className='header'>
            <Input
                value={inputValue}
                onChange={onChangeHandler}
                placeholder="Введите название задачи"
            />
            <Button
                title='Add'
                onClick={() => addTodoHandler(false, inputValue)}
            />
            {error && <div className="error-message">{error}</div>}
        </header>
    );
};
