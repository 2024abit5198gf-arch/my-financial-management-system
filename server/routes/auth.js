import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, name, role, classLevel } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: 'Email, password, name, and role are required.' });
  }

  if (!['admin', 'bursar', 'student'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be admin, bursar, or student.' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already in use.' });
  }

  const feeSchedule = {
    s1: 2100,
    s2: 2200,
    s3: 2300,
    s4: 2400,
    s5: 2500,
    s6: 2600,
  };

  const studentClass = role === 'student' ? classLevel || 's1' : null;
  const totalFees = role === 'student' ? feeSchedule[studentClass] || 0 : 0;
  const outstandingFees = totalFees;

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    role,
    classLevel: studentClass,
    totalFees,
    outstandingFees,
  });

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );

  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      classLevel: newUser.classLevel,
      totalFees: Number(newUser.totalFees),
      outstandingFees: Number(newUser.outstandingFees),
    },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    return res.status(401).json({ message: 'Invalid login credentials.' });
  }

  const isValid = await bcrypt.compare(password, existingUser.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid login credentials.' });
  }

  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email, name: existingUser.name, role: existingUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );

  return res.json({
    token,
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      classLevel: existingUser.classLevel,
      totalFees: Number(existingUser.totalFees),
      outstandingFees: Number(existingUser.outstandingFees),
    },
  });
});

export default router;
