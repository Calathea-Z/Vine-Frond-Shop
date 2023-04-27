import client from '../../../utils/client';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { cartItems } = req.body;
    console.log("Sanity CART", cartItems)
    try {
      const mutations = cartItems.map((cartItem) => ({
        patch: {
          id: cartItem._key,
          set: {
            countInStock: { 
              _type: 'number', 
              _operation: 'decrement', 
              value: cartItem.quantity 
            }
          }
        }
      }));
      console.log("Mutations", mutations)
      client.transaction(mutations);
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