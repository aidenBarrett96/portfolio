import '@/lib/drizzle/envConfg'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
} as any)
