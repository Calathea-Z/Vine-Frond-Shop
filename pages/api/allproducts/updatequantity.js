import client from '../../../utils/client';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { cartItems } = req.body;
    try {
      const mutations = cartItems.map((cartItem) => ({
        patch: {
          id: cartItem._key,
          dec: { countInStock: Number(cartItem.quantity) },
        },
      }));
      const transaction = client.transaction();
      mutations.forEach((mutation) => transaction.patch(mutation.id, mutation.patch));
      const result = await transaction.commit();  
      const updatedCartItems = cartItems.map((cartItem) => ({
        ...cartItem,
        countInStock: cartItem.countInStock - cartItem.quantity,
      }));  
      res.status(200).json(updatedCartItems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(404).json({ message: 'API endpoint not found' });
  }
}