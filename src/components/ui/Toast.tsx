"use client";

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-600" />,
        error: <AlertCircle className="w-5 h-5 text-red-600" />,
        info: <Info className="w-5 h-5 text-blue-600" />
    };

    const styles = {
        success: 'bg-green-50 border-green-200 text-green-900',
        error: 'bg-red-50 border-red-200 text-red-900',
        info: 'bg-blue-50 border-blue-200 text-blue-900'
    };

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-in ${styles[toast.type]}`}>
            {icons[toast.type]}
            <p className="flex-1 font-medium text-sm">{toast.message}</p>
            <button
                onClick={() => onClose(toast.id)}
                className="hover:opacity-70 transition-opacity"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
    return (
        <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-w-md">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    );
}
