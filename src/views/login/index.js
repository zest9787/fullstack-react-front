import React from 'react';
import {Form, Input, Button, Checkbox } from "antd";
import * as apiInstance from "../../components/api";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../redux/user/action";
import {useHistory, Redirect} from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const onFinish = values => {
        console.log('Success:', values);
        let param = {
            "username": "admin",
            "password": "1111"
        }
        apiInstance.postData('http://localhost:8080/api/auth/authentication', param).then(res => {
            console.log('res.data : ', res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userInfo', res.data);
            dispatch(loginSuccess(res.data));
            history.push('/');
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    // if (isLoggedIn) return <Redirect to={'/'}/>;
    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
