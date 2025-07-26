import { useAppearance } from '@/hooks/use-appearance';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export const useFlash = () => {
    const { flash } = usePage<SharedData>().props;
    const { appearance } = useAppearance();

    useEffect(() => {
        const handleDismiss = () => router.reload({ only: ['flash'] });

        if (flash?.success) {
            toast.success(flash.success, {
                onAutoClose: handleDismiss,
                onDismiss: handleDismiss,
                duration: 3000,
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                onAutoClose: handleDismiss,
                onDismiss: handleDismiss,
                duration: 3000,
            });
        }

        if (flash?.warning) {
            toast.warning(flash.warning, {
                onAutoClose: handleDismiss,
                onDismiss: handleDismiss,
                duration: 3000,
            });
        }

        if (flash?.info) {
            toast.info(flash.info, {
                onAutoClose: handleDismiss,
                onDismiss: handleDismiss,
                duration: 3000,
            });
        }
    }, [flash]);

    const FlashToaster = () => <Toaster position="top-right" richColors closeButton theme={appearance} />;

    return { FlashToaster };
};
