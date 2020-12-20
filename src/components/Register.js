import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Typography, Row } from 'antd';
import UserContext from '../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';
import Axios from 'axios';

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

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const { setUserData } = useContext(UserContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const newUser = { email, password, passwordCheck };
      await Axios.post('http://localhost:5000/users/register', newUser);
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
        style={{ height: '80vh' }}
      >
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
        >
          <Typography style={{ textAlign: 'center' }}>
            <Title level={2}>Register</Title>
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

          <Form.Item
            label='Password Check'
            name='passwordCheck'
            value={passwordCheck}
            onChange={handlePasswordCheck}
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
          <Link exact to='/'>
            <Form.Item {...tailLayout}>
              <Button type='primary'>Login</Button>
            </Form.Item>
          </Link>
        </Form>
      </Row>
    </>
  );
}

export default Register;
