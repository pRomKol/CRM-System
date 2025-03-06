import React from 'react';
import {Button, Form, FormProps, Input} from "antd";
import FormItem from "antd/es/form/FormItem";
import {FieldType} from "../login/LoginPage.tsx";

export const ForgotPassword = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = async (pass) =>{

    }
    return (
        <Form>
            <FormItem  label="Email"
                       name="email"
                       onFinish={onFinish}
            >
                <Input/>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">
                    Отправть
                </Button>
            </FormItem>
        </Form>
    );
};

