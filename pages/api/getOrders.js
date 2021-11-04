import Order from '../../model/orders';
import dbConnect from '../../lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === 'GET' && session) {
    await dbConnect();
    if (req.query._id != null) {
      const order = await Order.find({
        $and: [{ _id: req.query._id }, { 'user.userId': session.user.uid }],
      });
      return res.status(201).json(order);
    } else {
      const order = await Order.find({ 'user.userId': session.user.uid });
      return res.status(200).json(order);
    }
  } else {
    return res.status(402).json({ mess: 'niedozwolone' });
  }
}
