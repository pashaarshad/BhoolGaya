// ========================================
// BhoolGaya? - Application Constants
// ========================================

// ========================================
// App Info
// ========================================

export const APP_NAME = 'BhoolGaya?';
export const APP_TAGLINE = 'If a task exists anywhere, it exists here.';
export const APP_DESCRIPTION = 'A personal task management system that never forgets for you.';

// ========================================
// Reminder Intervals
// ========================================

export const REMINDER_INTERVALS = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
] as const;

export const DEFAULT_REMINDER_INTERVAL = 60;

// ========================================
// Vibration Settings
// ========================================

export const VIBRATION_DURATION_ENABLED = 5000; // 5 seconds in ms
export const VIBRATION_DURATION_DISABLED = 1000; // 1 second in ms

// ========================================
// Task Age Configuration
// ========================================

export const TASK_AGE_CONFIG = {
    today: {
        label: 'Today',
        color: 'var(--task-today)',
        bgColor: 'var(--task-today-bg)',
        emoji: '⚪',
    },
    yesterday: {
        label: 'Yesterday',
        color: 'var(--task-yesterday)',
        bgColor: 'var(--task-yesterday-bg)',
        emoji: '🟡',
    },
    '2days': {
        label: '2 days old',
        color: 'var(--task-2days)',
        bgColor: 'var(--task-2days-bg)',
        emoji: '🔵',
    },
    critical: {
        label: 'Critical',
        color: 'var(--task-critical)',
        bgColor: 'var(--task-critical-bg)',
        emoji: '🔴',
    },
} as const;

// ========================================
// Notification Templates
// ========================================

export const NOTIFICATION_TEMPLATES = {
    task_reminder: [
        "BhoolGaya? You wanted to finish this today.",
        "BhoolGaya? This task is waiting for you.",
        "BhoolGaya? Just a gentle reminder.",
        "BhoolGaya? One small step is all you need.",
    ],

    urgent_task: [
        "BhoolGaya? Yesterday's task is still waiting.",
        "BhoolGaya? This task has been pending for 2 days.",
        "BhoolGaya? Critical task needs your attention.",
    ],

    carry_forward: [
        "BhoolGaya? {count} tasks moved to tomorrow. Fresh start!",
        "BhoolGaya? Some tasks carried forward. No pressure.",
    ],

    free_mode: [
        "BhoolGaya? Nope! You completed everything. You're free now.",
        "BhoolGaya? All done! Want to learn something new?",
        "BhoolGaya? Great job! Time for yourself now.",
        "BhoolGaya? Try learning something new today.",
        "BhoolGaya? Practice communication skills for 5 minutes.",
        "BhoolGaya? Read one concept about business or finance.",
    ],

    ai_challenge: [
        "BhoolGaya? Today's learning challenge is ready!",
        "BhoolGaya? New concept to explore today.",
    ],

    motivation: [
        "BhoolGaya? One small step is all you need.",
        "BhoolGaya? You've got this. Start with one task.",
        "BhoolGaya? Progress over perfection.",
        "BhoolGaya? Clear one task to free your mind.",
    ],
} as const;

// ========================================
// Date Formatting
// ========================================

export const DATE_FORMATS = {
    display: 'MMM d, yyyy', // Feb 5, 2026
    displayWithDay: 'EEEE, MMM d, yyyy', // Wednesday, Feb 5, 2026
    time: 'h:mm a', // 8:00 PM
    dateTime: 'MMM d, yyyy h:mm a', // Feb 5, 2026 8:00 PM
    iso: 'yyyy-MM-dd', // 2026-02-05
} as const;

// ========================================
// Pagination
// ========================================

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ========================================
// Confidence Thresholds (V3)
// ========================================

export const CONFIDENCE_THRESHOLDS = {
    autoCreate: 0.85,  // Auto-create without confirmation
    suggest: 0.6,      // Suggest but ask for confirmation
    ignore: 0.4,       // Too low, don't suggest
} as const;

// ========================================
// Local Storage Keys
// ========================================

export const STORAGE_KEYS = {
    theme: 'bhoolgaya-theme',
    user: 'bhoolgaya-user',
    settings: 'bhoolgaya-settings',
    lastSync: 'bhoolgaya-last-sync',
} as const;

// ========================================
// Routes
// ========================================

export const ROUTES = {
    home: '/',
    login: '/login',
    signup: '/signup',
    dashboard: '/dashboard',
    tasks: '/tasks',
    matrix: '/matrix',
    analytics: '/analytics',
    settings: '/settings',
    chat: '/chat',
} as const;

// ========================================
// API Endpoints
// ========================================

export const API_ROUTES = {
    tasks: '/api/tasks',
    settings: '/api/settings',
    analytics: '/api/analytics',
    categories: '/api/categories',
    ai: {
        chat: '/api/ai/chat',
        challenge: '/api/ai/challenge',
        suggestions: '/api/ai/suggestions',
    },
} as const;

// ========================================
// Feature Flags
// ========================================

export const FEATURES = {
    matrix: true,           // V2
    analytics: true,        // V2
    categories: true,       // V2
    dailyDefaults: true,    // V2
    freeMode: true,         // V2
    aiChat: false,          // V3
    aiChallenges: false,    // V3
    whatsapp: false,        // V4
    calendar: false,        // V4
    location: false,        // V4
} as const;
