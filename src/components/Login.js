import React, { useState, useContext } from 'react';
import { Form, Input, Button, Typography, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';
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
  const [email, setEmail] = useState('potato@gmail.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const history = useHistory();

  const { setUserData } = useContext(UserContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
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
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      <Row type='flex' justify='center' style={{ marginTop: '4vh' }}>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
      </Row>
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
            label='Email'
            name='email'
            value={email}
            initialValue={email}
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
            initialValue={password}
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

          <Form.Item {...tailLayout}>
            <Button type='primary' onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
          <Link to='/register'>
            <Form.Item {...tailLayout}>
              <Button type='primary'>Create New Account</Button>
            </Form.Item>
          </Link>
        </Form>
      </Row>
    </>
  );
}

export default Login;
