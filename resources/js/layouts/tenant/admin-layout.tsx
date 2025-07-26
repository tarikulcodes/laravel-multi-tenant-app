import { useFlash } from '@/hooks/use-flash';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AdminLayout from './admin/sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { FlashToaster } = useFlash();

    return (
        <AdminLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
            <FlashToaster />
        </AdminLayout>
    );
};
