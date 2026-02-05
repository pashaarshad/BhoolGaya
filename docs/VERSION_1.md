# 📋 VERSION 1: Foundation

> **Focus**: Basic task management with carry-forward logic and notifications

---

## 🎯 Version 1 Goals

1. Create a working task management system
2. Implement task aging with color coding
3. Build carry-forward logic
4. Add basic notifications and reminders
5. Establish authentication system

---

## ✅ Feature Checklist

### 1.1 Project Setup
- [ ] Initialize Next.js 14+ with App Router
- [ ] Configure TypeScript (strict mode)
- [ ] Setup ESLint and Prettier
- [ ] Create folder structure
- [ ] Setup CSS design system with variables
- [ ] Add Google Fonts (Inter)

### 1.2 Firebase Setup
- [ ] Create Firebase project
- [ ] Enable Authentication (Google + Email)
- [ ] Create Firestore database
- [ ] Setup security rules
- [ ] Create Cloud Functions project
- [ ] Configure environment variables

### 1.3 Authentication
- [ ] Login page UI
- [ ] Signup page UI
- [ ] Google Sign-in button
- [ ] Email/Password form
- [ ] Auth context provider
- [ ] Protected route wrapper
- [ ] Logout functionality
- [ ] Loading states

### 1.4 Task Management (CRUD)
- [ ] Create task form/modal
  - Title (required)
  - Description (optional)
  - Due date (default: today)
- [ ] Task list view
- [ ] Task card component
  - Title display
  - Age indicator (color)
  - Complete button
  - Delete button
  - Edit button
- [ ] View task details
- [ ] Edit task modal
- [ ] Delete task (with confirmation)

### 1.5 Task Aging System
- [ ] Calculate `ageInDays` automatically
- [ ] Color coding implementation:
  ```
  ageInDays = 0  → ⚪ White (Today)
  ageInDays = 1  → 🟡 Yellow (Yesterday)
  ageInDays = 2  → 🔵 Blue (2 days)
  ageInDays >= 3 → 🔴 Red (Critical)
  ```
- [ ] Sort tasks by age (oldest first, then by creation time)
- [ ] Visual badge for age

### 1.6 Carry-Forward Logic
- [ ] Firebase Cloud Function setup
- [ ] Schedule function at midnight (IST)
- [ ] Query pending tasks before today
- [ ] Update for each pending task:
  - Move `taskDate` to today
  - Increment `ageInDays`
  - Increment `carryForwardCount`
- [ ] Preserve `originalDate`
- [ ] Batch updates for efficiency
- [ ] Error logging

### 1.7 Basic Notifications
- [ ] Service Worker setup
- [ ] Request notification permission
- [ ] Push notification configuration
- [ ] Reminder notification sending
- [ ] Complete/Cancel actions in notification

### 1.8 Basic Reminders
- [ ] Reminder interval selector
  - 15 minutes
  - 30 minutes
  - 1 hour (default)
  - 2 hours
- [ ] Per-task reminder toggle
- [ ] Client-side reminder scheduler
- [ ] Auto-stop on task completion

### 1.9 Settings (Basic)
- [ ] Settings page UI
- [ ] Default reminder interval
- [ ] Theme toggle (dark/light)
- [ ] Notification enable/disable
- [ ] User profile display
- [ ] Logout button

### 1.10 Dashboard
- [ ] Header with user info
- [ ] Task list section
- [ ] Add task button (FAB)
- [ ] Filter tabs (All, Pending, Completed)
- [ ] Empty state (no tasks)
- [ ] Loading skeleton

---

## 🖼️ UI Screens (V1)

### Screen 1: Login Page
```
┌─────────────────────────────────┐
│                                 │
│         🎯 BhoolGaya?          │
│    "If a task exists..."       │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Email                     │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ Password                  │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │        Login              │  │
│  └───────────────────────────┘  │
│                                 │
│           ─── or ───            │
│                                 │
│  ┌───────────────────────────┐  │
│  │  🔵 Continue with Google  │  │
│  └───────────────────────────┘  │
│                                 │
│     Don't have account? Signup  │
│                                 │
└─────────────────────────────────┘
```

### Screen 2: Dashboard (Task List)
```
┌─────────────────────────────────┐
│ 🎯 BhoolGaya?           👤 ⚙️  │
├─────────────────────────────────┤
│ Good morning, Arshad! 🌅        │
│ You have 5 pending tasks        │
├─────────────────────────────────┤
│ [All] [Pending] [Completed]     │
├─────────────────────────────────┤
│                                 │
│ 🔴 ┌─────────────────────────┐  │
│    │ Finish DSA Arrays       │  │
│    │ 3 days old              │  │
│    │              ✅  🗑️  ✏️ │  │
│    └─────────────────────────┘  │
│                                 │
│ 🔵 ┌─────────────────────────┐  │
│    │ Read OS Chapter 5       │  │
│    │ 2 days old              │  │
│    │              ✅  🗑️  ✏️ │  │
│    └─────────────────────────┘  │
│                                 │
│ 🟡 ┌─────────────────────────┐  │
│    │ Review Java OOP         │  │
│    │ 1 day old               │  │
│    │              ✅  🗑️  ✏️ │  │
│    └─────────────────────────┘  │
│                                 │
│ ⚪ ┌─────────────────────────┐  │
│    │ Watch AI Tutorial       │  │
│    │ Today                   │  │
│    │              ✅  🗑️  ✏️ │  │
│    └─────────────────────────┘  │
│                                 │
│                          ➕     │
│                                 │
└─────────────────────────────────┘
```

### Screen 3: Add Task Modal
```
┌─────────────────────────────────┐
│         Add New Task       ✕    │
├─────────────────────────────────┤
│                                 │
│  Task Title *                   │
│  ┌───────────────────────────┐  │
│  │ What do you need to do?   │  │
│  └───────────────────────────┘  │
│                                 │
│  Description (optional)         │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  Due Date                       │
│  ┌───────────────────────────┐  │
│  │ 📅 Today                  │  │
│  └───────────────────────────┘  │
│                                 │
│  🔔 Reminder                    │
│  ┌───────────────────────────┐  │
│  │ Every 1 hour         ▼   │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │       Create Task         │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

### Screen 4: Settings Page
```
┌─────────────────────────────────┐
│ ← Settings                      │
├─────────────────────────────────┤
│                                 │
│ Profile                         │
│ ┌───────────────────────────┐   │
│ │ 👤  Arshad               │   │
│ │     arshad@email.com      │   │
│ └───────────────────────────┘   │
│                                 │
│ Notifications                   │
│ ┌───────────────────────────┐   │
│ │ 🔔 Enable Notifications   ⚪│  │
│ └───────────────────────────┘   │
│                                 │
│ ┌───────────────────────────┐   │
│ │ Default Reminder         │   │
│ │ Every 1 hour          ▼  │   │
│ └───────────────────────────┘   │
│                                 │
│ Appearance                      │
│ ┌───────────────────────────┐   │
│ │ 🌙 Dark Mode             ⚪│  │
│ └───────────────────────────┘   │
│                                 │
│                                 │
│ ┌───────────────────────────┐   │
│ │       Logout              │   │
│ └───────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

## 🧩 Component Structure (V1)

```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.css
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.css
│   │   └── index.ts
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   ├── Modal.css
│   │   └── index.ts
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   ├── Badge.css
│   │   └── index.ts
│   ├── Toggle/
│   │   ├── Toggle.tsx
│   │   ├── Toggle.css
│   │   └── index.ts
│   └── Select/
│       ├── Select.tsx
│       ├── Select.css
│       └── index.ts
│
├── tasks/
│   ├── TaskCard/
│   │   ├── TaskCard.tsx
│   │   ├── TaskCard.css
│   │   └── index.ts
│   ├── TaskList/
│   │   ├── TaskList.tsx
│   │   ├── TaskList.css
│   │   └── index.ts
│   ├── TaskForm/
│   │   ├── TaskForm.tsx
│   │   ├── TaskForm.css
│   │   └── index.ts
│   └── EmptyState/
│       ├── EmptyState.tsx
│       ├── EmptyState.css
│       └── index.ts
│
└── layout/
    ├── Header/
    │   ├── Header.tsx
    │   ├── Header.css
    │   └── index.ts
    ├── Footer/
    │   ├── Footer.tsx
    │   ├── Footer.css
    │   └── index.ts
    └── Container/
        ├── Container.tsx
        ├── Container.css
        └── index.ts
```

---

## 📡 API Routes (V1)

### Task APIs

```typescript
// GET /api/tasks
// Query: status (optional), date (optional)
// Returns: Task[]

// POST /api/tasks
// Body: { title, description?, taskDate, reminderEnabled, reminderInterval }
// Returns: Task

// PUT /api/tasks/[id]
// Body: Partial<Task>
// Returns: Task

// DELETE /api/tasks/[id]
// Returns: { success: boolean }

// PATCH /api/tasks/[id]/complete
// Returns: Task
```

### Settings APIs

```typescript
// GET /api/settings
// Returns: UserSettings

// PUT /api/settings
// Body: Partial<UserSettings>
// Returns: UserSettings
```

---

## 🔥 Firebase Structure (V1)

### Collections

```
/users/{userId}
  - email: string
  - displayName: string
  - createdAt: timestamp

/tasks/{taskId}
  - userId: string
  - title: string
  - description: string
  - taskDate: timestamp
  - createdAt: timestamp
  - completedAt: timestamp | null
  - status: 'pending' | 'completed'
  - ageInDays: number
  - originalDate: timestamp
  - carryForwardCount: number
  - reminderEnabled: boolean
  - reminderInterval: number
  - important: false (default for V1)
  - urgent: false (default for V1)

/settings/{userId}
  - defaultReminderInterval: number
  - notificationsEnabled: boolean
  - theme: 'light' | 'dark'
```

---

## 🧪 Testing Scenarios (V1)

### Authentication
- [ ] User can sign up with email
- [ ] User can login with email
- [ ] User can login with Google
- [ ] User is redirected to dashboard after login
- [ ] User cannot access dashboard without login

### Tasks
- [ ] User can create a task
- [ ] User can view task list
- [ ] User can edit a task
- [ ] User can delete a task
- [ ] User can mark task as complete
- [ ] Completed tasks show green indicator

### Aging System
- [ ] Today's tasks show white
- [ ] 1-day old tasks show yellow
- [ ] 2-day old tasks show blue
- [ ] 3+ day old tasks show red
- [ ] Tasks are sorted by age

### Carry-Forward
- [ ] Pending tasks move to next day at midnight
- [ ] Age increases after carry-forward
- [ ] Completed tasks don't carry forward

---

## 🚀 Deployment (V1)

### Web (Vercel)
1. Connect GitHub repo
2. Configure environment variables
3. Deploy

### Firebase
1. Deploy Firestore rules
2. Deploy Cloud Functions
3. Enable authentication providers

---

## 📋 Definition of Done (V1)

Version 1 is complete when:

- [ ] User can login/logout
- [ ] User can CRUD tasks
- [ ] Tasks show correct age colors
- [ ] Carry-forward works at midnight
- [ ] Basic reminders work
- [ ] Settings are configurable
- [ ] App works on mobile (responsive)
- [ ] No critical bugs

---

*BhoolGaya? Version 1 - Foundation Complete* 🎯
