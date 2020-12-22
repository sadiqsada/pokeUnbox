import React from 'react';
import { Card } from 'antd';
import Axios from 'axios';

function DeckCardView(props) {
  const handleDelete = async () => {
    const id = props.data._id;
    const token = localStorage.getItem('auth-token');
    const deleteString = 'http://localhost:5000/cards/' + id;
    await Axios.delete(deleteString, {
      headers: { 'x-auth-token': token },
    })
      .then(() => {
        console.log('Deleted.');
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Card
      hoverable
      onClick={handleDelete}
      style={{ width: '16vw', height: '45vh' }}
      cover={<img style={{ height: '45vh' }} src={props.data.imageUrl}></img>}
    ></Card>
  );
}

export default DeckCardView;
