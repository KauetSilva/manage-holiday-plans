"use server";

import { authOptions } from "@/lib/auth";
import { z } from "zod";
import {
  deleteHolidaySchema,
  insertHolidaySchema,
  updateHolidaySchema,
} from "./schema";
import { getServerSession } from "next-auth/next";

export async function getUserHoliday() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const userId = session?.user.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOLIDAY_API}/get-holidays/${userId}`
  );
  const holidays = await response.json();

  return holidays;
}

export async function getUserHolidayPage(
  page: number = 1,
  pageSize: number = 10
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOLIDAY_API}/get-holidays/${userId}?page=${page}&pageSize=${pageSize}`
  );
  const holidays = await response.json();

  return holidays;
}

export async function insertHoliday(data: z.infer<typeof insertHolidaySchema>) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }
  data.userId = session?.user.id as string;
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOLIDAY_API}/add-holiday`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function updateHoliday(data: z.infer<typeof updateHolidaySchema>) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const userId = session?.user.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOLIDAY_API}/update-holiday/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response;
}

export async function deleteHoliday(
  input: z.infer<typeof deleteHolidaySchema>
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const holidayId = input.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOLIDAY_API}/delete-holiday/${holidayId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}
