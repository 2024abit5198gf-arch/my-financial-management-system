import express from 'express';
import { Transaction } from '../models/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const generateReference = () => {
  return `REF-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

router.get('/', authenticateToken, async (req, res) => {
  const { role, userId } = req.user;

  try {
    const where = role === 'student' ? { userId } : {};
    const transactions = await Transaction.findAll({ where, order: [['createdAt', 'DESC']] });

    return res.json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to fetch transactions.' });
  }
});

router.post('/pay', authenticateToken, async (req, res) => {
  const { role, userId } = req.user;
  const { classLevel, paymentOption } = req.body;

  if (role !== 'student') {
    return res.status(403).json({ message: 'Only students can make fee payments.' });
  }

  if (!classLevel || !paymentOption) {
    return res.status(400).json({ message: 'Class level and payment option are required.' });
  }

  const feesByClass = {
    form1: 2100,
    form2: 2200,
    form3: 2300,
    form4: 2400,
  };

  const totalFee = feesByClass[classLevel] || 0;
  const amount = paymentOption === 'full' ? totalFee : totalFee / 2;

  try {
    const transaction = await Transaction.create({
      reference: generateReference(),
      userId,
      amount,
      type: 'fee_payment',
      status: 'completed',
      description: `${paymentOption === 'full' ? 'Full' : 'Half'} fee payment for ${classLevel}`,
    });

    const student = await Transaction.sequelize.models.User.findByPk(userId);
    if (student) {
      const newOutstanding = Math.max(Number(student.outstandingFees) - amount, 0);
      await student.update({ outstandingFees: newOutstanding });
    }

    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to process payment.' });
  }
});

export default router;
