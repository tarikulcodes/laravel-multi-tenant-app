import { DataTable } from '@/components/datatable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/layouts/admin-layout';
import { ROLE_OUTLINE_COLORS } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { type PaginatedData, type User } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const UsersIndex = ({ usersData }: { usersData: PaginatedData<User> }) => {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'id',
            header: '#ID',
            enableSorting: true,
            cell: ({ row }) => {
                return <div className="">#{row.original.id}</div>;
            },
        },
        {
            header: 'Avatar',
            accessorKey: 'avatar',
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <Avatar className="size-12">
                        <AvatarImage src={row.original.avatar} />
                        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                );
            },
        },
        {
            accessorKey: 'name',
            header: 'Name',
            enableSorting: true,
            cell: ({ row }) => {
                return (
                    <div>
                        <h2 className="text-base font-medium">{row.original.name}</h2>
                        <p className="text-sm text-gray-500 italic">{row.original.email}</p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'roles',
            header: 'Roles',
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        {row.original.roles?.map((role) => (
                            <Badge
                                key={role.id}
                                variant="outline"
                                className={cn('capitalize', ROLE_OUTLINE_COLORS[role.name as keyof typeof ROLE_OUTLINE_COLORS])}
                            >
                                {role.text}
                            </Badge>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            enableSorting: true,
        },
        {
            accessorKey: 'updated_at',
            header: 'Updated At',
            enableSorting: true,
        },
    ];
    return (
        <AdminLayout breadcrumbs={[{ title: 'Users', href: '/admin/users' }]}>
            <Head title="Users" />

            <div className="p-4">
                <DataTable data={usersData.data} columns={columns} paginatedData={usersData} />
            </div>
        </AdminLayout>
    );
};

export default UsersIndex;
