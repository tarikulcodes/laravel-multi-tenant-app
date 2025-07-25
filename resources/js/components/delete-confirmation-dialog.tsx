import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { router } from '@inertiajs/react';
import { Loader2, OctagonAlert } from 'lucide-react';
import React, { useState } from 'react';
import { buttonVariants } from './ui/button';

interface DeleteConfirmationDialogProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    deleteUrl?: string;
    method?: 'delete' | 'post';
    disabled?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DeleteConfirmationDialog({
    children,
    title = 'Delete Item',
    description = 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    onConfirm,
    deleteUrl,
    method = 'delete',
    disabled = false,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
}: DeleteConfirmationDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

    const handleConfirm = async () => {
        if (disabled || isDeleting) return;

        setIsDeleting(true);

        try {
            if (onConfirm) {
                await onConfirm();
            } else if (deleteUrl) {
                router.visit(deleteUrl, {
                    method: method,
                    onSuccess: () => {
                        setOpen(false);
                    },
                    onError: () => {
                        // Handle error if needed
                    },
                    onFinish: () => {
                        setIsDeleting(false);
                    },
                });
                return; // Don't set isDeleting to false here as onFinish will handle it
            }
        } catch (error) {
            console.error('Delete operation failed:', error);
        } finally {
            if (!deleteUrl) {
                setIsDeleting(false);
                setOpen(false);
            }
        }
    };

    const dialogContent = (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    <div className="mr-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
                        <OctagonAlert className="h-5 w-5 text-destructive" />
                    </div>
                    {title}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[15px]">{description}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>{cancelText}</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm} disabled={isDeleting || disabled} className={buttonVariants({ variant: 'destructive' })}>
                    {isDeleting ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        confirmText
                    )}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );

    if (isControlled || !children) {
        return (
            <AlertDialog open={open} onOpenChange={setOpen}>
                {dialogContent}
            </AlertDialog>
        );
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild disabled={disabled}>
                {children}
            </AlertDialogTrigger>
            {dialogContent}
        </AlertDialog>
    );
}
