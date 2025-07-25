import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import React, { useState } from 'react';

interface UseDeleteConfirmationOptions<T> {
    title?: string;
    description?: string | ((item: T) => string);
    confirmText?: string;
    cancelText?: string;
    method?: 'delete' | 'post';
    getDeleteUrl: (item: T) => string;
}

interface UseDeleteConfirmationReturn<T> {
    showDeleteConfirmation: (item: T) => void;
    DeleteConfirmationComponent: () => React.JSX.Element | null;
}

export function useDeleteConfirmation<T>({
    title = 'Are you absolutely sure?',
    description = 'This action cannot be undone. This will permanently delete the item and remove it from our servers.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    method = 'delete',
    getDeleteUrl,
}: UseDeleteConfirmationOptions<T>): UseDeleteConfirmationReturn<T> {
    const [itemToDelete, setItemToDelete] = useState<T | null>(null);

    const showDeleteConfirmation = (item: T) => {
        setItemToDelete(item);
    };

    const getDescription = () => {
        if (!itemToDelete) return '';
        return typeof description === 'function' ? description(itemToDelete) : description;
    };

    const DeleteConfirmationComponent = () => {
        if (!itemToDelete) return null;

        return (
            <DeleteConfirmationDialog
                open={!!itemToDelete}
                onOpenChange={(open) => !open && setItemToDelete(null)}
                title={title}
                description={getDescription()}
                confirmText={confirmText}
                cancelText={cancelText}
                deleteUrl={getDeleteUrl(itemToDelete)}
                method={method}
            />
        );
    };

    return {
        showDeleteConfirmation,
        DeleteConfirmationComponent,
    };
}
