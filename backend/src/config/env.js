const requiredEnvironment = ['MONGODB_URI', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'JWT_SECRET'];

export function validateEnvironment() {
  const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]);
  if (missingEnvironment.length) {
    throw new Error(`Missing required environment variables: ${missingEnvironment.join(', ')}`);
  }

  if (process.env.ADMIN_PASSWORD.length < 6) {
    throw new Error('ADMIN_PASSWORD must be at least 6 characters long.');
  }

  if (Buffer.byteLength(process.env.JWT_SECRET) < 32) {
    throw new Error('JWT_SECRET must be at least 32 bytes long.');
  }

  return {
    port: Number(process.env.PORT || 3001),
    allowedOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim()),
  };
}
