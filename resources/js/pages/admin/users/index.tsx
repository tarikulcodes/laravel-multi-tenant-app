import AdminLayout from '@/layouts/admin-layout';
import { type PaginatedData, type User } from '@/types';
import { Head } from '@inertiajs/react';

const UsersIndex = ({ usersData }: { usersData: PaginatedData<User> }) => {
    return (
        <AdminLayout breadcrumbs={[{ title: 'Users', href: '/admin/users' }]}>
            <Head title="Users" />

            <div className="p-4">{/* <pre>{JSON.stringify(usersData, null, 2)}</pre> */}</div>
        </AdminLayout>
    );
};

export default UsersIndex;
