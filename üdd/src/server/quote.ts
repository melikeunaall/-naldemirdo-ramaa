import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const quoteSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(''),
  projectType: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(3000),
})

export const submitQuote = createServerFn({ method: 'POST' })
  .validator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { insertQuoteInquiry } = await import('./quote.server')
      await insertQuoteInquiry(data)
      return { success: true as const }
    } catch {
      return { success: false as const }
    }
  })
