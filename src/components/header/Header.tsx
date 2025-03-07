import './header.scss';
import { ChangeEvent, useState } from "react";
import { addTodo } from "../../features/todo.api.ts";
import {Button, Input} from "antd";
import {Link} from "react-router";

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
            console.error("NET", error);
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
                placeholder="Сюда"
            />

            <Button
                onClick={() => addTodoHandler(false, inputValue)}
            >
                ДОБАВИТЬ
            </Button>

            {error && <div className="error-message">{error}</div>}
            <Button>
                <Link to={'/login'}>
                Куда мнее пихать? ЧТо значит может? НУ типо ВОЙТИ
            </Link>
            </Button>
        </header>
    );
};
