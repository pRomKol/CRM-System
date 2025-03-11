import React, {useState} from 'react';
import { Button, Form, Input } from 'antd';
import { signUp } from "../../features/auth.api.ts";
import {useNavigate} from "react-router";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} обязательно!',
    types: {
        email: '${label} не является допустимым адресом электронной почты!',
    },
    string: {
        len: '${label} должно быть от ${min} до ${max} символов',
        range: '${label} должно быть от ${min} до ${max} символов',
    },
    pattern: {
        mismatch: '${label} недопустимо!',
    },
};
type ValuesType = {
    email: string;
    login: string;
    password: string;
    phone: string;
    username: string;
}

export const SignUpPage: React.FC = () => {
    const [error, setError] = useState<null | string>(null)
    const navigate = useNavigate()
    const onFinish = async (values: ValuesType) => {
        const formData = {
            email: values.email,
            login: values.login,
            password: values.password,
            phoneNumber: values.phone,
            username: values.username,
        };
        try {
           await signUp(formData)
            navigate('/login')
        } catch (error: any) {
           setError(error.response.data)


        }
    };
    return (
        <>
            <Form
                name="registration-form"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="username"
                    label="Имя пользователя"
                    rules={[
                        { required: true },
                        { min: 1, max: 60, message: 'Должно быть от 1 до 60 символов' },
                        { pattern: /^[a-zA-Zа-яА-Я]+$/, message: 'Должно содержать только буквы' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="login"
                    label="Логин"
                    rules={[
                        { required: true },
                        { min: 2, max: 60, message: 'Должно быть от 2 до 60 символов' },
                        { pattern: /^[a-zA-Z]+$/, message: 'Должно содержать только латинские буквы' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        { required: true },
                        { min: 6, max: 60, message: 'Должно быть от 6 до 60 символов' },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    label="Повторите пароль"
                    dependencies={['password']}
                    rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Почтовый адрес"
                    rules={[
                        { required: true, type: 'email' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[
                        {required: true, pattern: /^\+?[0-9]{10,15}$/, message: 'Должен быть допустимым номером телефона' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Зарегать
                    </Button>
                </Form.Item>
            </Form>
            {error && <div>{error}</div>}
        </>

    );
};
