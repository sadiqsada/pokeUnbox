import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Axios from 'axios';

function GenerateCard() {
  const [currentCard, setCurrentCard] = useState({
    imageUrlHiRes:
      'https://crystal-cdn3.crystalcommerce.com/photos/1140613/003.png',
  });
  const [currentDeck, setCurrentDeck] = useState([]);
  const [render, setRender] = useState(true);
  const [disableAdd, setDisableAdd] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();
  
  useEffect(() => {
    const checkTokenValid = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null || token === '') {
        localStorage.setItem('auth-token', '');
        token = '';
        setRender(false);
        history.push('/');
      }
      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        {
          headers: { 'x-auth-token': token },
        }
      );
      if (!tokenRes.data) {
        setRender(false);
        history.push('/');
      }
    };
    checkTokenValid();

    const getAllCards = async () => {
      let token = localStorage.getItem('auth-token');
      const deck = await Axios.get('http://localhost:5000/cards/all', {
        headers: { 'x-auth-token': token },
      });
      setCurrentDeck(deck.data);
    };
    getAllCards();
    setLoading(false);
  }, [history]);

  const handleGenerate = () => {
    let randNum = Math.floor(Math.random() * 130);
    fetch('https://api.pokemontcg.io/v1/cards?page=' + randNum).then((response) => {
      response.json().then((data) => {
        let randNum = Math.floor(Math.random() * data.cards.length);
        console.log(data.cards.length);
        setCurrentCard(data.cards[randNum]);
      });
    });

    setDisableAdd(false);
  };

  const handleAdd = async () => {
    const newCard = {
      name: currentCard.name,
      pokedexNum: currentCard.nationalPokedexNumber,
      types: currentCard.types,
    };
    let token = localStorage.getItem('auth-token');

    await Axios.post('http://localhost:5000/cards', newCard, {
      headers: { 'x-auth-token': token },
    });

    setCurrentDeck([...currentDeck, currentCard]);
    setDisableAdd(true);
  };
  let generateCard = !render || isLoading ? null : (
    <>
      <Header />
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Col span={12}>
          <Row
            style={{
              fontWeight: '500',
              fontFamily: ['Montserrat', 'sans-serif'],
              fontSize: '2em',
            }}
            justify='center'
          >
            Deck
          </Row>
          {currentDeck.map((card) => (
            <Row key={card.name} justify='center'>
              {card.name}
            </Row>
          ))}
        </Col>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          span={12}
        >
          <Row justify='center'>
            <Card
              hoverable
              style={{ width: 480, height: 600, marginTop: '2vh' }}
              cover={
                <img
                  style={{ height: 600 }}
                  alt='card'
                  src={currentCard.imageUrlHiRes}
                />
              }
            ></Card>
          </Row>
          <Row
            type='flex'
            justify='center'
            style={{ marginTop: '3vh' }}
            gutter={6}
          >
            <Col>
              <Button onClick={handleGenerate} type='primary'>
                Generate
              </Button>
            </Col>
            <Col>
              <Button onClick={handleAdd} type='primary' disabled={disableAdd}>
                Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  return generateCard;
}

export default GenerateCard;
