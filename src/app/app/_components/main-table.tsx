import TableList from './table-list';
import { getUserHolidayPage } from '../(main)/actions';

export async function MainTable() {
  const holidays = await getUserHolidayPage();

  return (
    <>
      <TableList holidays={holidays.holidays} />
    </>
  );
}
