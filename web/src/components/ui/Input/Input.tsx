'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    inputSize?: 'sm' | 'md' | 'lg';
    isRequired?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            inputSize = 'md',
            isRequired = false,
            className,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="input-wrapper">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn('input-label', isRequired && 'input-label--required')}
                    >
                        {label}
                    </label>
                )}

                <div className="input-container">
                    {leftIcon && <span className="input-icon input-icon--left">{leftIcon}</span>}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'input',
                            `input--${inputSize}`,
                            error && 'input--error',
                            leftIcon && 'input--with-left-icon',
                            rightIcon && 'input--with-right-icon',
                            className
                        )}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        {...props}
                    />

                    {rightIcon && <span className="input-icon input-icon--right">{rightIcon}</span>}
                </div>

                {error && (
                    <span id={`${inputId}-error`} className="input-error" role="alert">
                        {error}
                    </span>
                )}

                {helperText && !error && (
                    <span className="input-helper">{helperText}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

// Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    isRequired?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            helperText,
            isRequired = false,
            className,
            id,
            ...props
        },
        ref
    ) => {
        const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="input-wrapper">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className={cn('input-label', isRequired && 'input-label--required')}
                    >
                        {label}
                    </label>
                )}

                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn('input', 'textarea', error && 'input--error', className)}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${textareaId}-error` : undefined}
                    {...props}
                />

                {error && (
                    <span id={`${textareaId}-error`} className="input-error" role="alert">
                        {error}
                    </span>
                )}

                {helperText && !error && (
                    <span className="input-helper">{helperText}</span>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Input;
