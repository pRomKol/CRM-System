import React, {useState} from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {signIn} from "../../features/auth.api.ts";
import {Link, useNavigate} from "react-router";

export type FieldType = {
    login: string;
    password: string;
};

export const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await signIn({ login: values.login, password: values.password });
            navigate('/');
        }
        catch (erorrrrrrrrrrrrrrr){
            console.log(erorrrrrrrrrrrrrrr)
            if(erorrrrrrrrrrrrrrr.response.status === 401){
                setError('НЕВЕРНЫЙ логин или проль')
            } else {
                setError(erorrrrrrrrrrrrrrr.response.data)
            }

        }
    };
    return (
        <>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}

                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Login"
                    name="login"
                    rules={[{ required: true, message: 'Please input your login!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                <Button>
                    <Link to='/signUp'>Зарегать</Link>
                </Button>
            </Form>

        </>

    );
};
