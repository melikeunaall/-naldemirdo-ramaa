import '@tanstack/react-start/server-only'

import { db } from './db'
import { quoteInquiries } from './schema'

export async function insertQuoteInquiry(data: {
  name: string
  email: string
  phone?: string
  projectType: string
  message: string
}) {
  await db.insert(quoteInquiries).values(data)
}
