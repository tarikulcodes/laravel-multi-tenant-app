import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AdminSidebarLayout from './admin/admin-sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AdminSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AdminSidebarLayout>
);
