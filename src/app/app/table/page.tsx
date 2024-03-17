import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderTitle,
    DashboardPageMain,
  } from '@/components/dashboard/page'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { MainTable } from '../_components/main-table';
  
  export default async function Page() {
    const session = await getServerSession(authOptions);

    return (
      <DashboardPage>
        <DashboardPageHeader className='pb-[1.5rem] font-semibold'>
          <DashboardPageHeaderTitle>Table</DashboardPageHeaderTitle>
        </DashboardPageHeader>
        <DashboardPageMain>
            <MainTable/>
        </DashboardPageMain>
      </DashboardPage>
    )
  }
  