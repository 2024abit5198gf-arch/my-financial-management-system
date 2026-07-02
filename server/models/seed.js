import { User, FinanceSummary } from './index.js';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  const adminEmail = 'admin@kigaragara.edu';
  const existingAdmin = await User.findOne({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('StrongPassword123!', 10);
    await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: passwordHash,
    });
  }

  const summary = await FinanceSummary.findOne();
  if (!summary) {
    await FinanceSummary.create({
      revenue: 420000,
      outstanding: 52000,
      students: 842,
      monthlyData: [
        { month: 'Jan', value: 31000 },
        { month: 'Feb', value: 36000 },
        { month: 'Mar', value: 42000 },
        { month: 'Apr', value: 48000 },
        { month: 'May', value: 50000 },
        { month: 'Jun', value: 54000 },
      ],
    });
  }
};
