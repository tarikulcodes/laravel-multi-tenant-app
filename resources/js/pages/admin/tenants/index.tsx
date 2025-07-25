import { DataTable } from '@/components/datatable';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import AdminLayout from '@/layouts/admin-layout';
import { Tenant, type PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Ellipsis, Trash } from 'lucide-react';

const TenantsIndex = ({ tenantsData }: { tenantsData: PaginatedData<Tenant> }) => {
    const { showDeleteConfirmation, DeleteConfirmationComponent } = useDeleteConfirmation<Tenant>({
        getDeleteUrl: (tenant) => route('admin.tenants.destroy', tenant.id),
    });

    const columns: ColumnDef<Tenant>[] = [
        {
            accessorKey: 'id',
            header: '#ID',
            enableSorting: true,
            cell: ({ row }) => {
                return <div className="">#{row.original.id}</div>;
            },
        },
        {
            accessorKey: 'name',
            header: 'Name',
            enableSorting: false,
        },
        {
            header: 'Domains',
            accessorKey: 'domains',
            enableSorting: false,
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        {row.original.domains.map((domain) => (
                            <Badge key={domain}>{domain}</Badge>
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

    return (
        <AdminLayout breadcrumbs={[{ title: 'Tenants', href: '/admin/tenants' }]}>
            <Head title="Tenants" />

            <div className="p-4">
                <Heading title="Tenants" description="Manage your tenants with ease" />

                <DataTable
                    tableKey="tenants"
                    data={tenantsData.data}
                    columns={columns}
                    paginatedData={tenantsData}
                    activeBulkActions={true}
                    bulkDelete={{
                        route: route('admin.tenants.bulk-delete'),
                        title: 'Delete Tenants',
                        description: 'Are you sure you want to delete the selected tenants? This action cannot be undone.',
                    }}
                />
            </div>

            <DeleteConfirmationComponent />
        </AdminLayout>
    );
};

export default TenantsIndex;
