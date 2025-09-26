import { Navbar } from './components/_Navbar';
import { authOptions } from '@/lib/authoption';
import { getServerSession } from 'next-auth';
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar
        user={{
          name: session?.user?.name || '',
          imageUrl: session?.user?.image || '',
        }}
      />
      {children}
    </>
  );
}
