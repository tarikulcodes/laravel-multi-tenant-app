import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/tenant/app-header';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function HeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
