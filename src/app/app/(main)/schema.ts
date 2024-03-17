import { z } from 'zod'

  
//   export const HolidaySchema = z.object({
//     id: z.string(),
//     title: z.string(),
//     description: z.string(),
//     date: z.date(),
//     icon: z.string().nullable(),
//     user: UserSchema,
//     userId: z.string(),
//   });

export const insertHolidaySchema = z.object({
  userId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  date: z.string() || z.date(),
  icon: z.string().nullable(),
})

export const updateHolidaySchema = z.object({
  title: z.string().optional(),
  description: z.string(),
  date: z.string() || z.date(),
  icon: z.string().nullable(),
});

export const deleteHolidaySchema = z.object({
  id: z.string(),
})
