import { Navbar } from '@/components/dashboard/shared/Navbar';
import { authOptions } from '@/lib/authoption';
import { getServerSession } from 'next-auth';
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Handle unauthenticated state - redirect to signin or show loading
    return null;
  }

  return (
    <>
      <Navbar
        user={{
          name: session.user?.name || 'User',
          imageUrl: session.user?.imageUrl || '/default-avatar.png',
        }}
      />
      {children}
    </>
  );
}
