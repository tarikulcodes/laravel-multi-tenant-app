import AdminLayout from '@/layouts/admin-layout';

const AdminDashboardIndex = () => {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Dashboard', href: '/admin/dashboard' }]}>
            <div className="p-4">AdminDashboardIndex</div>
        </AdminLayout>
    );
};

export default AdminDashboardIndex;
