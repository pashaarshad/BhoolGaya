'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TaskAge } from '@/lib/types';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outlined' | 'ghost' | 'interactive';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    age?: TaskAge | 'completed';
    glow?: boolean;
    children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = 'default',
            padding = 'md',
            age,
            glow = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'card',
                    `card--${variant}`,
                    `card--padding-${padding}`,
                    age && `card--age-${age}`,
                    glow && 'card--glow',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// Card sub-components
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (
    <div className={cn('card-header', className)} {...props}>
        {children}
    </div>
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => (
    <h3 className={cn('card-title', className)} {...props}>
        {children}
    </h3>
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => (
    <p className={cn('card-description', className)} {...props}>
        {children}
    </p>
);

CardDescription.displayName = 'CardDescription';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ className, children, ...props }) => (
    <div className={cn('card-body', className)} {...props}>
        {children}
    </div>
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
    <div className={cn('card-footer', className)} {...props}>
        {children}
    </div>
);

CardFooter.displayName = 'CardFooter';

export default Card;
