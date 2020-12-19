import React, { useState, useEffect } from 'react';
import { Button, Row, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import Header from './Header';

function GenerateCard() {
  const [currentCard, setCurrentCard] = useState(
    'https://crystal-cdn3.crystalcommerce.com/photos/1140613/003.png'
  );
  const [render, setRender] = useState(true);

  const history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem('auth-token');
    if (token === null || token === '') {
      localStorage.setItem('auth-token', '');
      token = '';
      setRender(false);
      history.push('/');
    }
  }, []);

  const handleGenerate = () => {
    fetch('https://api.pokemontcg.io/v1/cards').then((response) => {
      response.json().then((data) => {
        let randNum = Math.floor(Math.random() * 100);
        setCurrentCard(data.cards[randNum].imageUrlHiRes);
      });
    });
  };

  let generateCard = !render ? null : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justify: 'middle',
      }}
    >
      <Header />
      <Row
        type='flex'
        justify='center'
        align='middle'
        style={{ minHeight: '60vh' }}
      >
        <Card
          hoverable
          style={{ width: 480, height: 600, marginTop: '2vh' }}
          cover={<img style={{ height: 600 }} alt='card' src={currentCard} />}
        ></Card>
      </Row>
      <Row
        type='flex'
        justify='center'
        align='middle'
        style={{ marginTop: '5vh' }}
      >
        <Button onClick={handleGenerate} type='primary'>
          Generate
        </Button>
      </Row>
    </div>
  );

  return generateCard;
}

export default GenerateCard;
