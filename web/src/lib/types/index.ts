// ========================================
// BhoolGaya? - Core Type Definitions
// ========================================

// ========================================
// Task Types
// ========================================

export type TaskStatus = 'pending' | 'completed';

export type TaskSource =
    | 'manual'
    | 'chatbot'
    | 'calendar'
    | 'whatsapp'
    | 'ai_challenge'
    | 'default';

export type ReminderInterval = 15 | 30 | 60 | 120 | 'custom';

export type TaskAge = 'today' | 'yesterday' | '2days' | 'critical';

export interface Task {
    // Core identification
    id: string;
    userId: string;

    // Task content
    title: string;
    description?: string;

    // Scheduling
    taskDate: Date;
    createdAt: Date;
    completedAt?: Date;

    // Status & aging
    status: TaskStatus;
    ageInDays: number;

    // Priority (Eisenhower Matrix)
    important: boolean;
    urgent: boolean;

    // Carry-forward tracking
    originalDate: Date;
    carryForwardCount: number;

    // Reminders
    reminderEnabled: boolean;
    reminderInterval: ReminderInterval;
    customReminderMinutes?: number;

    // Source tracking (V3+)
    source: TaskSource;
    sourceReference?: string;
    confidenceScore?: number;

    // Location (V4)
    preferredLocation?: string;
    remoteAllowed: boolean;

    // Categories (V2+)
    category?: string;
    tags?: string[];
}

// Task creation input (without auto-generated fields)
export interface CreateTaskInput {
    title: string;
    description?: string;
    taskDate?: Date;
    important?: boolean;
    urgent?: boolean;
    reminderEnabled?: boolean;
    reminderInterval?: ReminderInterval;
    customReminderMinutes?: number;
    category?: string;
    tags?: string[];
}

// Task update input
export interface UpdateTaskInput {
    title?: string;
    description?: string;
    taskDate?: Date;
    important?: boolean;
    urgent?: boolean;
    reminderEnabled?: boolean;
    reminderInterval?: ReminderInterval;
    customReminderMinutes?: number;
    category?: string;
    tags?: string[];
}

// ========================================
// User & Settings Types
// ========================================

export interface User {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: Date;
}

export type Theme = 'light' | 'dark' | 'system';

export type DefaultView = 'list' | 'matrix';

export interface DailyDefaultTask {
    id: string;
    title: string;
    important: boolean;
    urgent: boolean;
    enabled: boolean;
}

export interface Location {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    radius: number; // meters
}

export interface UserSettings {
    userId: string;

    // Reminder preferences
    defaultReminderInterval: ReminderInterval;
    vibrationEnabled: boolean;
    vibrationDuration: 5 | 1; // seconds
    quietHoursEnabled: boolean;
    quietHoursStart?: string; // "22:00"
    quietHoursEnd?: string; // "07:00"

    // Notification preferences
    notificationsEnabled: boolean;
    freeModeNotification: boolean;
    dailyDigestEnabled: boolean;

    // Display preferences
    theme: Theme;
    showCompletedTasks: boolean;
    defaultView: DefaultView;

    // Default daily tasks
    dailyDefaultTasks: DailyDefaultTask[];

    // Locations (V4)
    locations?: Location[];
}

// Default settings for new users
export const DEFAULT_USER_SETTINGS: Omit<UserSettings, 'userId'> = {
    defaultReminderInterval: 60,
    vibrationEnabled: true,
    vibrationDuration: 5,
    quietHoursEnabled: false,
    notificationsEnabled: true,
    freeModeNotification: true,
    dailyDigestEnabled: false,
    theme: 'dark',
    showCompletedTasks: false,
    defaultView: 'list',
    dailyDefaultTasks: [
        { id: 'default-1', title: 'DSA Practice', important: true, urgent: false, enabled: true },
        { id: 'default-2', title: 'Self-Learning', important: true, urgent: false, enabled: true },
        { id: 'default-3', title: 'Health/Exercise', important: true, urgent: false, enabled: true },
    ],
};

// ========================================
// Eisenhower Matrix Types
// ========================================

export type Quadrant = 'q1' | 'q2' | 'q3' | 'q4';

export interface QuadrantInfo {
    id: Quadrant;
    name: string;
    label: string;
    description: string;
    color: string;
    bgColor: string;
}

export const QUADRANTS: Record<Quadrant, QuadrantInfo> = {
    q1: {
        id: 'q1',
        name: 'Do Now',
        label: 'Important & Urgent',
        description: 'Critical tasks that need immediate attention',
        color: 'var(--q1-do-now)',
        bgColor: 'var(--q1-do-now-bg)',
    },
    q2: {
        id: 'q2',
        name: 'Schedule',
        label: 'Important & Not Urgent',
        description: 'Tasks that build your future',
        color: 'var(--q2-schedule)',
        bgColor: 'var(--q2-schedule-bg)',
    },
    q3: {
        id: 'q3',
        name: 'Delegate',
        label: 'Not Important & Urgent',
        description: 'Interruptions and quick tasks',
        color: 'var(--q3-delegate)',
        bgColor: 'var(--q3-delegate-bg)',
    },
    q4: {
        id: 'q4',
        name: 'Eliminate',
        label: 'Not Important & Not Urgent',
        description: 'Tasks to minimize or avoid',
        color: 'var(--q4-eliminate)',
        bgColor: 'var(--q4-eliminate-bg)',
    },
};

// ========================================
// Analytics Types (V2+)
// ========================================

export interface DailyAnalytics {
    id: string;
    userId: string;
    date: Date;

    tasksCreated: number;
    tasksCompleted: number;
    tasksCarriedForward: number;

    // By age when completed
    completedSameDay: number;
    completedOneDayOld: number;
    completedTwoDaysOld: number;
    completedCritical: number;

    // By quadrant
    q1Completed: number;
    q2Completed: number;
    q3Completed: number;
    q4Completed: number;

    // By category
    completedByCategory: Record<string, number>;
}

export interface WeeklyInsights {
    userId: string;
    weekStart: Date;
    weekEnd: Date;

    totalCompleted: number;
    totalCarriedForward: number;
    bestDay: string;
    worstDay: string;
    currentStreak: number;

    quadrantBreakdown: {
        q1: number;
        q2: number;
        q3: number;
        q4: number;
    };
}

// ========================================
// AI Types (V3+)
// ========================================

export interface DailyChallenge {
    id: string;
    userId: string;
    title: string;
    description: string;
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedMinutes: number;
    resources?: string[];
    status: 'pending' | 'accepted' | 'skipped' | 'completed';
    createdAt: Date;
}

export interface TaskExtractionResult {
    isTask: boolean;
    confidence: number;
    task?: {
        title: string;
        date?: Date;
        important?: boolean;
        urgent?: boolean;
        category?: string;
    };
    reasoning?: string;
}

// ========================================
// Notification Types
// ========================================

export type NotificationType =
    | 'task_reminder'
    | 'urgent_task'
    | 'carry_forward'
    | 'free_mode'
    | 'ai_challenge'
    | 'daily_digest'
    | 'motivation';

export interface BhoolGayaNotification {
    id: string;
    type: NotificationType;
    title: string;
    body: string;
    taskId?: string;
    vibrationDuration: number;
    priority: 'low' | 'normal' | 'high';
    createdAt: Date;
    read: boolean;
}

// ========================================
// Category Types (V2+)
// ========================================

export interface Category {
    id: string;
    userId: string;
    name: string;
    color: string;
    icon?: string;
    isDefault: boolean;
}

export const DEFAULT_CATEGORIES: Omit<Category, 'id' | 'userId'>[] = [
    { name: 'Study', color: '#3b82f6', icon: '📚', isDefault: true },
    { name: 'Work', color: '#8b5cf6', icon: '💼', isDefault: true },
    { name: 'Personal', color: '#22c55e', icon: '🏠', isDefault: true },
    { name: 'Health', color: '#ef4444', icon: '❤️', isDefault: true },
    { name: 'Fun', color: '#f59e0b', icon: '🎮', isDefault: true },
];

// ========================================
// Utility Types
// ========================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

export type FilterStatus = 'all' | 'pending' | 'completed';

export interface TaskFilters {
    status?: FilterStatus;
    quadrant?: Quadrant;
    category?: string;
    dateFrom?: Date;
    dateTo?: Date;
    search?: string;
}
