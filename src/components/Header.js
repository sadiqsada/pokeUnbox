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
    localStorage.setItem('auth-token', '');
    history.push('/');
  };
  return (
    <Menu theme='dark' mode='horizontal'>
      <Menu.Item
        style={{
          float: 'left',
          fontSize: '1.4em',
          color: 'white',
          fontWeight: 700,
        }}
        disabled
        key='1'
      >
        PokeUnbox
      </Menu.Item>
      <Menu.Item
        style={{
          float: 'right',
        }}
        key='2'
        onClick={handleLogout}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );
}

export default Header;
