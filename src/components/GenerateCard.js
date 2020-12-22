import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Axios from 'axios';
import DeckCardView from './DeckCardView';

function GenerateCard() {
  const [currentCard, setCurrentCard] = useState({
    imageUrlHiRes:
      'https://crystal-cdn3.crystalcommerce.com/photos/1140613/003.png',
  });
  const [currentDeck, setCurrentDeck] = useState([]);
  const [render, setRender] = useState(true);
  const [disableAdd, setDisableAdd] = useState(true);

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
  }, []);

  const handleGenerate = () => {
    let randNum = Math.floor(Math.random() * 130);
    fetch('https://api.pokemontcg.io/v1/cards?page=' + randNum).then(
      (response) => {
        response.json().then((data) => {
          let randNum = Math.floor(Math.random() * data.cards.length);
          setCurrentCard(data.cards[randNum]);
        });
      }
    );

    setDisableAdd(false);
  };

  const handleAdd = async () => {
    const newCard = {
      name: currentCard.name,
      pokedexNum: currentCard.nationalPokedexNumber,
      types: currentCard.types,
      imageUrl: currentCard.imageUrl,
    };
    let token = localStorage.getItem('auth-token');

    await Axios.post('http://localhost:5000/cards', newCard, {
      headers: { 'x-auth-token': token },
    });

    setCurrentDeck([...currentDeck, currentCard]);
    setDisableAdd(true);
  };

  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };

  let generateCard = !render ? null : (
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
          <Row style={{ marginLeft: '1vw' }}>
            {currentDeck.map((card) => (
              <DeckCardView key={card._id} data={card} />
            ))}
          </Row>
          <Row style={{ marginTop: '1vh' }} justify='center'>
            <Button onClick={handleGoToTop} type='primary'>
              Go To Top
            </Button>
          </Row>
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
