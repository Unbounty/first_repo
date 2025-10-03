const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // For parsing JSON in requests

// In-memory card storage
let cards = [];
let idCounter = 1;

// 🎴 Card schema: { id, suit, value }

// ✅ CREATE a card (POST /cards)
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  // Simple validation
  if (!suit || !value) {
    return res.status(400).json({ error: 'Suit and value are required.' });
  }

  const newCard = {
    id: idCounter++,
    suit,
    value,
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// ✅ READ all cards (GET /cards)
app.get('/cards', (req, res) => {
  res.json(cards);
});

// ✅ READ single card by ID (GET /cards/:id)
app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ error: 'Card not found.' });
  }
  res.json(card);
});

// ✅ UPDATE a card (PUT /cards/:id)
app.put('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ error: 'Card not found.' });
  }

  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ error: 'Suit and value are required.' });
  }

  card.suit = suit;
  card.value = value;

  res.json(card);
});

// ✅ DELETE a card (DELETE /cards/:id)
app.delete('/cards/:id', (req, res) => {
  const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (cardIndex === -1) {
    return res.status(404).json({ error: 'Card not found.' });
  }

  const deletedCard = cards.splice(cardIndex, 1);
  res.json(deletedCard[0]);
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
