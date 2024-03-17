import { Request, Response } from "express";
import { z, ZodError } from "zod";
import HolidayService from "../services/holiday.service";

interface HolidayBody {
  id?: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

interface HolidayResult {
  title: string;
  description: string;
  date: string | Date;
  icon: string | null;
}

const CreateHoliday = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  date: z.union([z.string(), z.date()]), // Use z.union para permitir mais de um tipo
  icon: z.union([z.string(), z.null()]), // Use z.union para permitir mais de um tipo
});

export default class HolidayController {

  public async createHoliday(req: Request, res: Response) {
    const holidayService = new HolidayService();
    const { userId, title, description, date, icon } = req.body;

    try {
      const validatedDTO = {
        userId,
        title,
        description,
        date,
        icon
      } as HolidayBody;

      const result: HolidayResult | "user_not_found" | "error_creating_holiday" = await holidayService.createHoliday(validatedDTO);
      
      if (result === "user_not_found") {
        return res.status(404).send({
          error: `Cliente não encontrado. Digite um ID válido.`,
        });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({ errors: formattedErrors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  public async getHolidaysByUser(req: Request, res: Response) {
    const holidayService = new HolidayService();
    const { userId } = req.params;
    const { page, pageSize } = req.query;

    try {
      const pageValue = Number(page) || 1;
      const pageSizeValue = Number(pageSize) || 10;
      const result = await holidayService.getHolidaysByUser(userId, pageValue, pageSizeValue);

      if (result === "user_not_found") {
        return res.status(404).send({
          error: `Cliente com ID ${userId} não encontrado. Digite um ID válido`,
        });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getHolidayById(req: Request, res: Response) {
    const holidayService = new HolidayService();
    const { holidayId } = req.params;

    try {
      const result = await holidayService.getHolidayById(holidayId);

      if (result === "holiday_not_found") {
        return res.status(404).send({
          error: `Feriado com ID ${holidayId} não encontrado. Digite um ID válido`,
        });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async updateHolidayById(req: Request, res: Response) {
    const holidayService = new HolidayService();
    const { holidayId } = req.params;
    const { title, description, date, icon } = req.body;

    try {
      const result = await holidayService.updateHolidayById(
        holidayId,
        title,
        description,
        date,
        icon
      );

      if (result === "holiday_not_found") {
        return res.status(404).send({
          error: `Feriado com ID ${holidayId} não encontrado. Digite um ID válido`,
        });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async deleteHolidayById(req: Request, res: Response) {
    const holidayService = new HolidayService();
    const { holidayId } = req.params;

    try {
      const result = await holidayService.deleteHolidayById(holidayId);

      if (result === "holiday_not_found") {
        return res.status(404).send({
          error: `Feriado com ID ${holidayId} não encontrado. Digite um ID válido`,
        });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
