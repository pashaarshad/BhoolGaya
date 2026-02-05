// ========================================
// BhoolGaya? - Utility Functions
// ========================================

import { Task, TaskAge, Quadrant } from '@/lib/types';
import { TASK_AGE_CONFIG } from '@/lib/constants';

// ========================================
// Date Utilities
// ========================================

/**
 * Get the start of a day (midnight)
 */
export function startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

/**
 * Get the end of a day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * Get days difference between two dates
 */
export function getDaysDifference(date1: Date, date2: Date): number {
    const d1 = startOfDay(date1);
    const d2 = startOfDay(date2);
    const diffTime = d2.getTime() - d1.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format a date for display
 */
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options || defaultOptions);
}

/**
 * Format time for display
 */
export function formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}

/**
 * Get relative date label (Today, Yesterday, etc.)
 */
export function getRelativeDateLabel(date: Date): string {
    const today = new Date();
    const daysDiff = getDaysDifference(date, today);

    if (daysDiff === 0) return 'Today';
    if (daysDiff === 1) return 'Tomorrow';
    if (daysDiff === -1) return 'Yesterday';
    if (daysDiff > 1 && daysDiff <= 7) return `In ${daysDiff} days`;
    if (daysDiff < -1 && daysDiff >= -7) return `${Math.abs(daysDiff)} days ago`;

    return formatDate(date);
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// ========================================
// Task Utilities
// ========================================

/**
 * Calculate task age in days
 */
export function calculateTaskAge(originalDate: Date): number {
    return Math.max(0, getDaysDifference(originalDate, new Date()));
}

/**
 * Get task age category (today, yesterday, 2days, critical)
 */
export function getTaskAgeCategory(ageInDays: number): TaskAge {
    if (ageInDays === 0) return 'today';
    if (ageInDays === 1) return 'yesterday';
    if (ageInDays === 2) return '2days';
    return 'critical';
}

/**
 * Get task age configuration
 */
export function getTaskAgeConfig(ageInDays: number) {
    const category = getTaskAgeCategory(ageInDays);
    return TASK_AGE_CONFIG[category];
}

/**
 * Get quadrant from important/urgent flags
 */
export function getQuadrant(important: boolean, urgent: boolean): Quadrant {
    if (important && urgent) return 'q1';
    if (important && !urgent) return 'q2';
    if (!important && urgent) return 'q3';
    return 'q4';
}

/**
 * Sort tasks by priority (age first, then quadrant)
 */
export function sortTasksByPriority(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
        // First, sort by status (pending first)
        if (a.status !== b.status) {
            return a.status === 'pending' ? -1 : 1;
        }

        // Then by age (oldest first for pending)
        if (a.status === 'pending' && b.ageInDays !== a.ageInDays) {
            return b.ageInDays - a.ageInDays;
        }

        // Then by quadrant priority (Q1 > Q2 > Q3 > Q4)
        const quadrantA = getQuadrant(a.important, a.urgent);
        const quadrantB = getQuadrant(b.important, b.urgent);
        const quadrantOrder = { q1: 0, q2: 1, q3: 2, q4: 3 };
        if (quadrantOrder[quadrantA] !== quadrantOrder[quadrantB]) {
            return quadrantOrder[quadrantA] - quadrantOrder[quadrantB];
        }

        // Finally by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

/**
 * Filter tasks by status
 */
export function filterTasksByStatus(tasks: Task[], status: 'all' | 'pending' | 'completed'): Task[] {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
}

/**
 * Group tasks by quadrant
 */
export function groupTasksByQuadrant(tasks: Task[]): Record<Quadrant, Task[]> {
    return {
        q1: tasks.filter(t => t.important && t.urgent),
        q2: tasks.filter(t => t.important && !t.urgent),
        q3: tasks.filter(t => !t.important && t.urgent),
        q4: tasks.filter(t => !t.important && !t.urgent),
    };
}

// ========================================
// String Utilities
// ========================================

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
}

/**
 * Generate a random ID
 */
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ========================================
// Storage Utilities
// ========================================

/**
 * Safe localStorage get
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * Safe localStorage set
 */
export function setToStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

/**
 * Safe localStorage remove
 */
export function removeFromStorage(key: string): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Failed to remove from localStorage:', error);
    }
}

// ========================================
// Notification Utilities
// ========================================

/**
 * Get a random notification message from templates
 */
export function getRandomNotificationMessage(messages: readonly string[]): string {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
}

/**
 * Show a browser notification
 */
export function showNotification(title: string, body: string, options?: NotificationOptions): void {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return;
    }

    if (Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/icon.png', ...options });
    }
}

// ========================================
// Vibration Utilities
// ========================================

/**
 * Trigger device vibration
 */
export function vibrate(duration: number): void {
    if (typeof window === 'undefined' || !('vibrate' in navigator)) {
        return;
    }

    try {
        navigator.vibrate(duration);
    } catch (error) {
        console.error('Vibration failed:', error);
    }
}

// ========================================
// Class Name Utilities
// ========================================

/**
 * Merge class names conditionally
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

// ========================================
// Debounce & Throttle
// ========================================

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
