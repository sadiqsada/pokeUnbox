import React from 'react';
import { Card } from 'antd';

function DeckCardView(props) {
  return (
    <Card
      style={{ width: '16vw', height: '45vh' }}
      cover={<img style={{ height: '45vh' }} src={props.data.imageUrl}></img>}
    ></Card>
  );
}

export default DeckCardView;
