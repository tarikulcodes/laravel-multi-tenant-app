import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import PublicHeaderLayout from './public/public-header-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <PublicHeaderLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </PublicHeaderLayout>
);
