'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    isIcon?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            isIcon = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            children,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'button',
                    `button--${variant}`,
                    `button--${size}`,
                    isLoading && 'button--loading',
                    isIcon && 'button--icon',
                    fullWidth && 'button--full',
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {leftIcon && <span className="button__icon">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="button__icon">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
