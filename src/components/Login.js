import React, { useState, useContext } from 'react';
import { Form, Input, Button, Checkbox, Typography, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from '../context/UserContext';

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const { setUserData } = useContext(UserContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const loginRes = await Axios.post('http://localhost:5000/users/login', {
      email,
      password,
    });
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem('auth-token', loginRes.data.token);
    history.push('/generate');
  };

  return (
    <>
      <Row
        type='flex'
        justify='center'
        align='middle'
        style={{ minHeight: '100vh' }}
      >
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
        >
          <Typography style={{ textAlign: 'center' }}>
            <Title level={2}>Login</Title>
          </Typography>
          <Form.Item
            label='Username'
            name='username'
            value={email}
            onChange={handleEmail}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            value={password}
            onChange={handlePassword}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}

export default Login;
