# 📋 VERSION 2: Advanced Features

> **Focus**: Eisenhower Matrix, analytics, advanced settings, and complete task engine

---

## 🎯 Version 2 Goals

1. Implement Eisenhower Matrix (Important/Urgent quadrants)
2. Build comprehensive analytics dashboard
3. Add advanced reminder and notification settings
4. Create default daily tasks system
5. Implement free mode notifications
6. Add categories and tags

---

## ✅ Feature Checklist

### 2.1 Eisenhower Matrix
- [ ] Add `important` field to tasks (boolean)
- [ ] Add `urgent` field to tasks (boolean)
- [ ] Matrix view UI (4 quadrants grid)
- [ ] Quick toggle buttons on task cards
- [ ] Filter by quadrant
- [ ] Quadrant indicators on list view
- [ ] Auto-upgrade urgency for old tasks (optional)

### Matrix Quadrant Definitions
```
Q1: Important + Urgent     → 🔴 DO NOW
Q2: Important + Not Urgent → 🔵 SCHEDULE (Build Future)
Q3: Not Important + Urgent → 🟡 DELEGATE (Interruptions)
Q4: Not Important + Not Urgent → ⚫ ELIMINATE (Avoid)
```

### 2.2 Advanced Reminders
- [ ] Custom reminder intervals (slider/input)
- [ ] Vibration toggle with duration:
  - ON: 5 seconds
  - OFF: 1 second (fallback)
- [ ] Quiet hours configuration
  - Start time picker
  - End time picker
- [ ] Per-task reminder override
- [ ] Snooze options (15m, 30m, 1h, tomorrow)
- [ ] Sound selection (future)

### 2.3 Default Daily Tasks
- [ ] Settings section for daily defaults
- [ ] Add/remove default tasks
- [ ] Configure per default:
  - Title
  - Important/Urgent flags
  - Enable/disable toggle
- [ ] Auto-creation at midnight
- [ ] Pre-configured suggestions:
  - DSA Practice
  - Self-Learning
  - Health/Exercise
  - Revision
  - Free/Enjoyment Time

### 2.4 Free Mode Notification
- [ ] Detect all tasks completed state
- [ ] Trigger one-time notification
- [ ] Configurable message pool:
  - "Try learning something new"
  - "Practice communication skills"
  - "Read about business/finance"
  - "Improve English speaking"
- [ ] Toggle in settings (enable/disable)
- [ ] No repeat same day

### 2.5 Analytics Dashboard
- [ ] Daily completion chart (bar/line)
- [ ] Weekly summary stats
- [ ] Monthly trends
- [ ] Quadrant-wise completion breakdown
- [ ] Carry-forward rate over time
- [ ] Best productive day detection
- [ ] Streak tracking (consecutive days)
- [ ] Task age distribution
- [ ] Source breakdown (for V3+)

### 2.6 Categories & Tags
- [ ] Category model
- [ ] Default categories:
  - Study
  - Personal
  - Health
  - Work
  - Fun
- [ ] Custom category creation
- [ ] Color per category
- [ ] Tag system (multiple per task)
- [ ] Filter by category/tag
- [ ] Category-wise analytics

### 2.7 Enhanced Task Card
- [ ] Quadrant indicator badge
- [ ] Category pill
- [ ] Age color border
- [ ] Reminder status icon
- [ ] Quick complete animation
- [ ] Swipe actions (mobile)

### 2.8 Enhanced Settings
- [ ] Reorganized settings UI
- [ ] Sections:
  - Profile
  - Notifications
  - Reminders
  - Vibration
  - Daily Defaults
  - Display
  - Privacy (placeholder)
  - About
- [ ] Import/Export data (JSON)

---

## 🖼️ UI Screens (V2)

### Screen 1: Eisenhower Matrix View
```
┌─────────────────────────────────┐
│ 🎯 BhoolGaya?      📋 ⊞  👤 ⚙️ │
│                    List Matrix  │
├────────────────┬────────────────┤
│                │                │
│  🔴 DO NOW     │  🔵 SCHEDULE   │
│  Important +   │  Important +   │
│  Urgent        │  Not Urgent    │
│                │                │
│ ┌────────────┐ │ ┌────────────┐ │
│ │ DSA Arrays │ │ │ Learn React│ │
│ └────────────┘ │ │  Patterns  │ │
│ ┌────────────┐ │ └────────────┘ │
│ │ Fix Bug    │ │ ┌────────────┐ │
│ └────────────┘ │ │ Read Book  │ │
│                │ └────────────┘ │
│                │                │
├────────────────┼────────────────┤
│                │                │
│  🟡 DELEGATE   │  ⚫ ELIMINATE  │
│  Not Important │  Not Important │
│  + Urgent      │  + Not Urgent  │
│                │                │
│ ┌────────────┐ │ ┌────────────┐ │
│ │ Reply Email│ │ │ Social Med │ │
│ └────────────┘ │ └────────────┘ │
│                │                │
│                │  ➕            │
└────────────────┴────────────────┘
```

### Screen 2: Analytics Dashboard
```
┌─────────────────────────────────┐
│ ← Analytics                     │
├─────────────────────────────────┤
│                                 │
│  This Week Summary              │
│ ┌───────────────────────────┐   │
│ │ ✅ 28 Completed           │   │
│ │ 🔄 5 Carried Forward      │   │
│ │ 🔥 7 Day Streak           │   │
│ └───────────────────────────┘   │
│                                 │
│  Daily Progress                 │
│ ┌───────────────────────────┐   │
│ │   █ █ █ █ █ █ █           │   │
│ │   8 6 5 4 7 5 3           │   │
│ │   M T W T F S S           │   │
│ └───────────────────────────┘   │
│                                 │
│  By Priority                    │
│ ┌───────────────────────────┐   │
│ │ 🔴 Q1: 12 tasks (43%)     │   │
│ │ ████████████░░░░░░░░░░░░  │   │
│ │                           │   │
│ │ 🔵 Q2: 8 tasks (29%)      │   │
│ │ ████████░░░░░░░░░░░░░░░░  │   │
│ │                           │   │
│ │ 🟡 Q3: 5 tasks (18%)      │   │
│ │ █████░░░░░░░░░░░░░░░░░░░  │   │
│ │                           │   │
│ │ ⚫ Q4: 3 tasks (10%)      │   │
│ │ ███░░░░░░░░░░░░░░░░░░░░░  │   │
│ └───────────────────────────┘   │
│                                 │
│  Best Day: Sunday 🏆            │
│  Avg Tasks/Day: 4.5             │
│                                 │
└─────────────────────────────────┘
```

### Screen 3: Advanced Settings
```
┌─────────────────────────────────┐
│ ← Settings                      │
├─────────────────────────────────┤
│                                 │
│ 👤 Profile                      │
│ ┌───────────────────────────┐   │
│ │ Arshad                    │   │
│ │ arshad@email.com          │   │
│ └───────────────────────────┘   │
│                                 │
│ 🔔 Notifications & Reminders    │
│ ┌───────────────────────────┐   │
│ │ Notifications         ⚪  │   │
│ │ Default Interval      ▼   │   │
│ │ [15m] [30m] [1h✓] [2h]    │   │
│ └───────────────────────────┘   │
│                                 │
│ 📳 Vibration                    │
│ ┌───────────────────────────┐   │
│ │ Vibration             ⚪  │   │
│ │ Duration: 5 seconds       │   │
│ │ (1 second when disabled)  │   │
│ └───────────────────────────┘   │
│                                 │
│ 🌙 Quiet Hours                  │
│ ┌───────────────────────────┐   │
│ │ Enable Quiet Hours    ⚪  │   │
│ │ From: 22:00               │   │
│ │ To: 07:00                 │   │
│ └───────────────────────────┘   │
│                                 │
│ 📅 Daily Default Tasks          │
│ ┌───────────────────────────┐   │
│ │ ✅ DSA Practice           │   │
│ │ ✅ Self-Learning          │   │
│ │ ✅ Health/Exercise        │   │
│ │ ☐ Revision                │   │
│ │ ➕ Add Default Task       │   │
│ └───────────────────────────┘   │
│                                 │
│ 🎉 Free Mode                    │
│ ┌───────────────────────────┐   │
│ │ Show suggestion when      │   │
│ │ all tasks complete    ⚪  │   │
│ └───────────────────────────┘   │
│                                 │
│ 🎨 Appearance                   │
│ ┌───────────────────────────┐   │
│ │ Theme                 ▼   │   │
│ │ [Light] [Dark✓] [System]  │   │
│ │                           │   │
│ │ Default View              │   │
│ │ [List✓] [Matrix]          │   │
│ └───────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

### Screen 4: Add Task (Extended)
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
│  └───────────────────────────┘  │
│                                 │
│  Due Date                       │
│  ┌───────────────────────────┐  │
│  │ 📅 Today             ▼   │  │
│  └───────────────────────────┘  │
│                                 │
│  Priority                       │
│  ┌─────────────┬─────────────┐  │
│  │ ⬜ Important │ ⬜ Urgent   │  │
│  └─────────────┴─────────────┘  │
│                                 │
│  Category                       │
│  ┌───────────────────────────┐  │
│  │ 📚 Study               ▼ │  │
│  └───────────────────────────┘  │
│                                 │
│  Tags (optional)                │
│  ┌───────────────────────────┐  │
│  │ + Add tag                 │  │
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

---

## 📊 Analytics Data Model

```typescript
interface DailyAnalytics {
  id: string;
  userId: string;
  date: Date;
  
  // Task counts
  tasksCreated: number;
  tasksCompleted: number;
  tasksCarriedForward: number;
  
  // By age when completed
  completedSameDay: number;      // Age 0
  completedOneDayOld: number;    // Age 1
  completedTwoDaysOld: number;   // Age 2
  completedCritical: number;     // Age 3+
  
  // By quadrant
  q1Completed: number;  // Do Now
  q2Completed: number;  // Schedule
  q3Completed: number;  // Delegate
  q4Completed: number;  // Eliminate
  
  // By category
  completedByCategory: Record<string, number>;
}

interface WeeklyInsights {
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
```

---

## 🧩 New Components (V2)

```
components/
├── matrix/
│   ├── MatrixView/
│   │   ├── MatrixView.tsx
│   │   ├── MatrixView.css
│   │   └── index.ts
│   ├── Quadrant/
│   │   ├── Quadrant.tsx
│   │   ├── Quadrant.css
│   │   └── index.ts
│   └── QuadrantBadge/
│       ├── QuadrantBadge.tsx
│       ├── QuadrantBadge.css
│       └── index.ts
│
├── analytics/
│   ├── AnalyticsDashboard/
│   ├── DailyChart/
│   ├── QuadrantChart/
│   ├── StreakCounter/
│   ├── StatCard/
│   └── InsightCard/
│
├── settings/
│   ├── SettingsSection/
│   ├── ReminderConfig/
│   ├── VibrationConfig/
│   ├── QuietHoursConfig/
│   ├── DailyDefaultsConfig/
│   ├── ThemeSelector/
│   └── FreeModeConfig/
│
└── categories/
    ├── CategoryPicker/
    ├── CategoryBadge/
    ├── TagInput/
    └── CategoryManager/
```

---

## 📡 API Routes (V2)

```typescript
// Analytics
GET /api/analytics/daily?from=DATE&to=DATE
GET /api/analytics/weekly?week=DATE
GET /api/analytics/streak

// Categories
GET /api/categories
POST /api/categories
PUT /api/categories/[id]
DELETE /api/categories/[id]

// Daily Defaults
GET /api/defaults
POST /api/defaults
PUT /api/defaults/[id]
DELETE /api/defaults/[id]
```

---

## 🔥 Firebase Functions (V2)

### Create Daily Default Tasks

```typescript
export const createDailyDefaults = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    const usersSnapshot = await db.collection('users').get();
    
    for (const userDoc of usersSnapshot.docs) {
      const settingsDoc = await db.collection('settings')
        .doc(userDoc.id).get();
      
      const defaults = settingsDoc.data()?.dailyDefaultTasks || [];
      const batch = db.batch();
      
      for (const defaultTask of defaults) {
        if (defaultTask.enabled) {
          const taskRef = db.collection('tasks').doc();
          batch.set(taskRef, {
            userId: userDoc.id,
            title: defaultTask.title,
            description: '',
            taskDate: admin.firestore.Timestamp.now(),
            createdAt: admin.firestore.Timestamp.now(),
            status: 'pending',
            important: defaultTask.important || false,
            urgent: defaultTask.urgent || false,
            ageInDays: 0,
            carryForwardCount: 0,
            originalDate: admin.firestore.Timestamp.now(),
            source: 'default',
            reminderEnabled: true,
            reminderInterval: 60,
          });
        }
      }
      
      await batch.commit();
    }
  });
```

### Generate Daily Analytics

```typescript
export const generateDailyAnalytics = functions.pubsub
  .schedule('0 23 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    const usersSnapshot = await db.collection('users').get();
    
    for (const userDoc of usersSnapshot.docs) {
      const tasksSnapshot = await db.collection('tasks')
        .where('userId', '==', userDoc.id)
        .where('completedAt', '>=', startOfDay)
        .where('completedAt', '<=', endOfDay)
        .get();
      
      let analytics = {
        tasksCompleted: 0,
        q1Completed: 0,
        q2Completed: 0,
        q3Completed: 0,
        q4Completed: 0,
        // ... other fields
      };
      
      tasksSnapshot.forEach(doc => {
        const task = doc.data();
        analytics.tasksCompleted++;
        
        // Quadrant logic
        if (task.important && task.urgent) analytics.q1Completed++;
        else if (task.important && !task.urgent) analytics.q2Completed++;
        else if (!task.important && task.urgent) analytics.q3Completed++;
        else analytics.q4Completed++;
      });
      
      await db.collection('analytics').add({
        userId: userDoc.id,
        date: admin.firestore.Timestamp.now(),
        ...analytics,
      });
    }
  });
```

---

## 🧪 Testing Scenarios (V2)

### Eisenhower Matrix
- [ ] Tasks can be marked as Important
- [ ] Tasks can be marked as Urgent
- [ ] Matrix view shows 4 quadrants
- [ ] Tasks appear in correct quadrant
- [ ] Toggling priority moves task to new quadrant

### Analytics
- [ ] Daily chart shows correct data
- [ ] Streak counter is accurate
- [ ] Quadrant breakdown is calculated correctly
- [ ] Best day detection works

### Daily Defaults
- [ ] Default tasks can be configured
- [ ] Default tasks auto-create at midnight
- [ ] Disabled defaults don't create tasks

### Free Mode
- [ ] Notification triggers when all complete
- [ ] Only one notification per day
- [ ] Can be disabled in settings

---

## 📋 Definition of Done (V2)

Version 2 is complete when:

- [ ] Eisenhower Matrix view works
- [ ] Tasks have Important/Urgent toggles
- [ ] Analytics dashboard shows charts
- [ ] Streak is tracked correctly
- [ ] Daily defaults auto-create
- [ ] Free mode notification works
- [ ] Vibration settings work
- [ ] Categories can be assigned
- [ ] All V1 features still work

---

*BhoolGaya? Version 2 - Advanced Features Complete* 📊
