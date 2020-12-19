import React, { useContext } from 'react';
import { Menu } from 'antd';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

function Header() {
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const handleLogout = () => {
    setUserData({
      token: 'undefined',
      user: 'undefined',
    });
    history.push('/');
  };
  return (
    <Menu
      onClick={handleLogout}
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['2']}
    >
      <Menu.Item
        style={{
          float: 'right',
        }}
        key='1'
      >
        Log Out
      </Menu.Item>
    </Menu>
  );
}

export default Header;
