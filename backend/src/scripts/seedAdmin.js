import 'dotenv/config';
import crypto from 'node:crypto';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import { validateEnvironment } from '../config/env.js';

try {
  validateEnvironment();
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = await new Promise((resolve, reject) => {
    crypto.scrypt(process.env.ADMIN_PASSWORD, salt, 64, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(`scrypt$${salt}$${derivedKey.toString('hex')}`);
    });
  });

  await mongoose.connect(process.env.MONGODB_URI);
  const admin = await Admin.findOneAndUpdate(
    { email: process.env.ADMIN_EMAIL.trim().toLowerCase() },
    { $set: { passwordHash } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  );

  console.log(`Admin account seeded: ${admin.email}`);
} catch (error) {
  console.error('Admin seed failed:', error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
