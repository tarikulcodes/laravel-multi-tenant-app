import { useFlash } from '@/hooks/use-flash';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import PublicLayout from './public/header-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { FlashToaster } = useFlash();

    return (
        <PublicLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
            <FlashToaster />
        </PublicLayout>
    );
};
