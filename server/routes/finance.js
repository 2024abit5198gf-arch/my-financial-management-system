import express from 'express';
import { FinanceSummary, User } from '../models/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/summary', authenticateToken, async (req, res) => {
  const summary = await FinanceSummary.findOne({ order: [['createdAt', 'DESC']] });

  if (!summary) {
    return res.status(404).json({ message: 'Finance summary not found.' });
  }

  return res.json({
    revenue: summary.revenue,
    outstanding: summary.outstanding,
    students: summary.students,
    chart: summary.monthlyData,
  });
});

router.get('/fees', authenticateToken, async (req, res) => {
  const { role, userId } = req.user;

  if (role === 'student') {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({
      student: {
        id: user.id,
        name: user.name,
        classLevel: user.classLevel,
        totalFees: Number(user.totalFees),
        outstandingFees: Number(user.outstandingFees),
      },
    });
  }

  const students = await User.findAll({ where: { role: 'student' }, order: [['classLevel', 'ASC'], ['name', 'ASC']] });

  const classTotals = {
    s1: { classLevel: 'S1', totalStudents: 0, totalFees: 0, outstandingFees: 0 },
    s2: { classLevel: 'S2', totalStudents: 0, totalFees: 0, outstandingFees: 0 },
    s3: { classLevel: 'S3', totalStudents: 0, totalFees: 0, outstandingFees: 0 },
    s4: { classLevel: 'S4', totalStudents: 0, totalFees: 0, outstandingFees: 0 },
    s5: { classLevel: 'S5', totalStudents: 0, totalFees: 0, outstandingFees: 0 },
    s6: { classLevel: 'S6', totalStudents: 0, totalFees: 0, outstandingFees: 0 },
  };

  const studentBalances = students.map((student) => {
    const classKey = student.classLevel || 's1';
    if (classTotals[classKey]) {
      classTotals[classKey].totalStudents += 1;
      classTotals[classKey].totalFees += Number(student.totalFees);
      classTotals[classKey].outstandingFees += Number(student.outstandingFees);
    }

    return {
      id: student.id,
      name: student.name,
      email: student.email,
      classLevel: student.classLevel || 's1',
      totalFees: Number(student.totalFees),
      outstandingFees: Number(student.outstandingFees),
    };
  });

  return res.json({
    classTotals: Object.values(classTotals),
    studentBalances,
  });
});

export default router;
