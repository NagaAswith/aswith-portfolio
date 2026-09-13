import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Control Center | Aswith Portfolio',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const isAuth = await isAuthenticatedAdmin();

  if (!isAuth) {
    redirect('/');
  }

  return <AdminDashboard />;
}
