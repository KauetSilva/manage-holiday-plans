import DashboardHoliday from "../_components/dashboard-componente";
import { getUserHoliday } from "./actions";

export default async function Page() {
  const holidaysData = await getUserHoliday();

  const sortedHolidays = holidaysData.holidays.sort(
    (a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    }
  );

  const latestHolidays = sortedHolidays.slice(0, 5);

  return (
    <div>
      <DashboardHoliday holidays={latestHolidays} />
    </div>
  );
}
