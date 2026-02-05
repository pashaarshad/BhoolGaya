'use client';

import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import './Modal.css';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    size = 'md',
    showCloseButton = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    children,
    footer,
}) => {
    // Handle escape key
    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === 'Escape') {
                onClose();
            }
        },
        [closeOnEscape, onClose]
    );

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    // Add/remove event listeners and body class
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.classList.add('modal-open');
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.classList.remove('modal-open');
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    // Check if we're in a browser environment
    if (typeof window === 'undefined') return null;

    return createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div
                className={cn('modal', `modal--${size}`)}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                {(title || showCloseButton) && (
                    <div className="modal-header">
                        {title && (
                            <h2 id="modal-title" className="modal-title">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                className="modal-close"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                <div className="modal-body">{children}</div>

                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>,
        document.body
    );
};

Modal.displayName = 'Modal';

export default Modal;
