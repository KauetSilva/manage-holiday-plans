'use client'
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page';
import Holiday from './holiday-list';
import { useState } from 'react';
import { MobileSidebar } from './mobile-sidebar';
import { SessionProvider } from "next-auth/react";

export default function DashboardHoliday({ holidays }: any) {
  const [isAddHolidayModalOpen, setAddHolidayModalOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const openAddHolidayModal = () => {
    setAddHolidayModalOpen(true);
  };

  const closeAddHolidayModal = () => {
    setAddHolidayModalOpen(false);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <SessionProvider>
      <DashboardPage>
        <DashboardPageHeader className="flex justify-between items-center">
          <DashboardPageHeaderTitle className="font-semibold">
            Holidays
          </DashboardPageHeaderTitle>
          
        </DashboardPageHeader>
        <DashboardPageMain>
          <Holiday onAddHolidayClick={openAddHolidayModal} holidaysData={holidays}  />
        </DashboardPageMain>
      </DashboardPage>

      {isMobileSidebarOpen && <MobileSidebar />}
      </SessionProvider>
    </div>
  );
   
}
