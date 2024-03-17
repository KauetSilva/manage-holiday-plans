import { ReturnTypeWithoutPromise } from '@/types/return-type-without-promise'
import { getUserHoliday, insertHoliday } from './actions'

export type Holiday = ReturnTypeWithoutPromise<typeof getUserHoliday>[0]

export type Todo = ReturnTypeWithoutPromise<typeof insertHoliday>