const router = require('express').Router();
const auth = require('../middleware/auth');
const Card = require('../models/cardModel');

router.post('/', auth, async (req, res) => {
  try {
    const { name, pokedexNum, types, imageUrl } = req.body;
    if (!name || !pokedexNum) {
      return res.status(400).json({ msg: 'Not all fields have been entered' });
    }

    const newCard = new Card({
      name,
      pokedexNum,
      types,
      imageUrl,
      userId: req.user,
    });

    const savedCard = await newCard.save();
    res.json(savedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', auth, async (req, res) => {
  const cards = await Card.find({
    userId: req.user,
  });
  res.json(cards);
});

router.delete('/:id', auth, async (req, res) => {
  const card = await Card.findOne({ userId: req.user, _id: req.params.id });
  if (!card) {
    return res.status(400).json({ msg: 'No card found with this ID.' });
  }
  const deletedCard = await Card.findByIdAndDelete(req.params.id);
  res.json(deletedCard);
});

module.exports = router;
