import { PropsWithChildren } from 'react';
import { MainSidebar } from './_components/main-sidebar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { UserDropdownMobile } from "./_components/user-dropdown-mobile";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (!session) {
    return redirect('/');
  }

  return (
    <>
      <div className="block sm:hidden">
        <UserDropdownMobile user={session?.user} />
        <main>{children}</main>
      </div>

      <div className="hidden sm:block 2xl:block">
        <div className="grid grid-cols-[16rem_1fr]">
          <MainSidebar user={session?.user} />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
