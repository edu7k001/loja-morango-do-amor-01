require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('.'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { nome, preco } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(preco * 100),
      currency: 'brl',
      payment_method_types: ['pix'],
      description: nome,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Erro ao criar pagamento' });
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));