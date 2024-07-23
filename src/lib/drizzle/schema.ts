import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql)

// Create a pgTable that maps to a table in your DB
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  company: text('company').notNull(),
  jobTitle: text('job_title').notNull(),
  testimonial: text('testimonial').notNull(),
  socialURL: text('social_url').notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})
