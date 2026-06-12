import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getAllContent } from '@/lib/content'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  const content = await getAllContent()
  return <AdminDashboard initialContent={content} />
}
