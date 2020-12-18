import React, { useState } from 'react';
import { Button, Row, Card } from 'antd';

function GenerateCard() {
  const [currentCard, setCurrentCard] = useState(
    'https://crystal-cdn3.crystalcommerce.com/photos/1140613/003.png'
  );

  const handleGenerate = () => {
    fetch('https://api.pokemontcg.io/v1/cards').then((response) => {
      response.json().then((data) => {
        let randNum = Math.floor(Math.random() * 100);
        setCurrentCard(data.cards[randNum].imageUrlHiRes);
      });
    });
  };

  return (
    <>
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
    </>
  );
}

export default GenerateCard;
