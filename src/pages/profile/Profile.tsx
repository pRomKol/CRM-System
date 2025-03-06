import {getUserProfile, updateUserProfile} from "../../features/auth.api.ts";
import {useQuery} from "react-query";
import {Button, Form, FormProps, Input} from "antd";
import {FieldType} from "../login/LoginPage.tsx";
import React from "react";

export const Profile = () => {
    const {data, error, isLoading, refetch} = useQuery('userData', getUserProfile);
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        await updateUserProfile(values);
        await refetch()

    }
    return (
        <>
            <ul style={{fontSize: 30}}>
                <li>
                    {data?.username}
                </li>
                <li>
                    {data?.email}
                </li>
                <li>
                    {data?.phoneNumber}
                </li>
            </ul>
            <Form onFinish={onFinish}>
                <Form.Item
                    label='изменить почту'
                    name='email'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите адрес электронной почты'},
                        {type: 'email', message: 'Пожалуйста, введите корректный адрес электронной почты'}
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    rules={[
                        {required: true, message: 'Пожалуйста, введите имя пользователя'},
                        {min: 1, max: 60, message: 'Должно быть от 1 до 60 символов'},
                        {pattern: /^[a-zA-Zа-яА-Я]+$/, message: 'Должно содержать только буквы'},
                    ]}
                    name='username'
                    label='изменить имя'
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label='телефон'
                    name='phoneNumber'
                    rules={[
                        {required: true, message: 'Пожалуйста, введите номер телефона'},
                        {pattern: /^\+?[0-9]{10,15}$/, message: 'Должен быть допустимым номером телефона'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Izmenit
                    </Button>
                </Form.Item>
            </Form>

        </>
    );
};
