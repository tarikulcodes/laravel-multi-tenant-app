import { DataTable } from '@/components/datatable';
import Heading from '@/components/heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { useInitials } from '@/hooks/use-initials';
import AdminLayout from '@/layouts/admin-layout';
import { ROLE_OUTLINE_COLORS } from '@/lib/colors';
import { cn } from '@/lib/utils';
import { DropdownFilter, Role, type PaginatedData, type User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Ellipsis, Eye, Pencil, Trash } from 'lucide-react';

const UsersIndex = ({ usersData, roles }: { usersData: PaginatedData<User>; roles: Role[] }) => {
    const initials = useInitials();

    const { showDeleteConfirmation, DeleteConfirmationComponent } = useDeleteConfirmation<User>({
        getDeleteUrl: (user) => route('admin.users.destroy', user.id),
    });

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
                    <Avatar className="size-10">
                        <AvatarImage src={row.original.avatar} />
                        <AvatarFallback>{initials(row.original.name)}</AvatarFallback>
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

        {
            accessorKey: 'actions',
            header: 'Actions',
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Ellipsis className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left" align="start">
                            <DropdownMenuItem variant="default" asChild>
                                <Link href={route('admin.users.show', row.original.id)}>
                                    <Eye className="size-4" />
                                    View
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="default" asChild>
                                <Link href={route('admin.users.edit', row.original.id)}>
                                    <Pencil className="size-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive" onSelect={() => showDeleteConfirmation(row.original)}>
                                <Trash className="size-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const dropdownFilters: DropdownFilter[] = [
        {
            accessorKey: 'filter_by_role',
            label: 'Roles',
            options: [{ label: 'All', value: '' }, ...(roles?.map((role) => ({ label: role.text, value: role.name })) || [])],
        },
    ];

    return (
        <AdminLayout breadcrumbs={[{ title: 'Users', href: '/admin/users' }]}>
            <Head title="Users" />

            <div className="p-4">
                <Heading title="Users" description="Manage your users with ease" />

                <DataTable
                    tableKey="users"
                    data={usersData.data}
                    columns={columns}
                    paginatedData={usersData}
                    dropdownFilters={dropdownFilters}
                    activeBulkActions={true}
                    bulkDelete={{
                        route: route('admin.users.bulk-delete'),
                        title: 'Delete Users',
                        description: 'Are you sure you want to delete the selected users? This action cannot be undone.',
                    }}
                />
            </div>

            <DeleteConfirmationComponent />
        </AdminLayout>
    );
};

export default UsersIndex;
