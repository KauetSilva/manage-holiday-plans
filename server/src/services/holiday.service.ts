import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface HolidayResult {
  id?: string;
  userId?: string;
  title: string;
  description: string;
  date: string | Date;
  icon: string | null;
}

export default class HolidayService {
  public async createHoliday(data: {
    userId: string;
    title: string;
    description: string;
    date: string;
    icon: string;
  }): Promise<HolidayResult | "user_not_found" | "error_creating_holiday"> {
    try {
      const { userId, title, description, date, icon } = data;
      const user = await prisma.user.findFirst({ where: { id: userId } });

      if (!user) {
        return "user_not_found";
      }

      await prisma.holiday.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          title,
          description,
          date: new Date(date),
          icon,
        },
      });

      const response: HolidayResult = {
        title,
        description,
        date: new Date(date),
        icon,
      };

      return response;
    } catch (error) {
      console.error("Error creating holiday:", error);
      return "error_creating_holiday";
    }
  }

  public async getHolidaysByUser(
    userId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    holidays: HolidayResult[];
    totalPages: number;
  } | "user_not_found"> {
    try {
      const skip = (page - 1) * pageSize;

      const holidays = await prisma.holiday.findMany({
        where: { userId },
        skip,
        orderBy: { date: 'desc' },
      });

      const totalCount: number = await prisma.holiday.count({
        where: { userId },
      });

      const totalPages = Math.ceil(totalCount / pageSize);

      const response = {
        holidays: holidays.map((holiday) => ({
          id: holiday.id,
          title: holiday.title,
          description: holiday.description,
          date: holiday.date,
          icon: holiday.icon,
        })),
        totalPages,
      };

      return response;
    } catch (error) {
      console.error("Error getting holidays by user:", error);
      throw error;
    }
  }

  public async getHolidayById(
    holidayId: string
  ): Promise<HolidayResult | "holiday_not_found"> {
    try {
      const holiday = await prisma.holiday.findUnique({
        where: { id: holidayId },
      });

      if (!holiday) {
        return "holiday_not_found";
      }

      const response: HolidayResult = {
        id: holiday.id,
        title: holiday.title,
        description: holiday.description,
        date: holiday.date,
        icon: holiday.icon,
      };

      return response;
    } catch (error) {
      console.error("Error getting holiday by ID:", error);
      throw error;
    }
  }

  public async updateHolidayById(
    holidayId: string,
    title: string,
    description: string,
    date: string,
    icon: string
  ): Promise<HolidayResult | "holiday_not_found"> {
    try {
      const existingHoliday = await prisma.holiday.findUnique({
        where: { id: holidayId },
      });

      if (!existingHoliday) {
        return "holiday_not_found";
      }

      const updatedHoliday = await prisma.holiday.update({
        where: { id: holidayId },
        data: {
          title: title || existingHoliday.title,
          description: description || existingHoliday.description,
          date: new Date(date) || existingHoliday.date,
          icon: icon || existingHoliday.icon,
        },
      });

      const response: HolidayResult = {
        id: updatedHoliday.id,
        title: updatedHoliday.title,
        date: updatedHoliday.date,
        description: updatedHoliday.description,
        icon: updatedHoliday.icon,
      };

      return response;
    } catch (error) {
      console.error("Error updating holiday by ID:", error);
      throw error;
    }
  }

  public async deleteHolidayById(
    holidayId: string
  ): Promise<HolidayResult | "holiday_not_found"> {
    try {
      const existingHoliday = await prisma.holiday.findUnique({
        where: { id: holidayId },
      });

      if (!existingHoliday) {
        return "holiday_not_found";
      }

      const deletedHoliday = await prisma.holiday.delete({
        where: {
          id: holidayId,
        },
      });

      return deletedHoliday;
    } catch (error) {
      console.error("Error delete holiday by ID:", error);
      throw error;
    }
  }
}
