# 🎯 BhoolGaya? - Master Implementation Plan

> **"If a task exists anywhere, it exists here."**

---

## 📱 App Identity

| Property | Value |
|----------|-------|
| **App Name** | BhoolGaya? |
| **Meaning** | "Did you forget?" (Hindi) |
| **Philosophy** | A personal memory system that never forgets for you |
| **Target Users** | Students, Learners, Productivity-focused individuals |
| **Platforms** | Web (Next.js), Android (Native), Desktop (Future) |

---

## 🏗️ Version Roadmap Overview

| Version | Focus | Key Features |
|---------|-------|--------------|
| **V1** | Foundation | Basic tasks, notifications, reminders, carry-forward |
| **V2** | Advanced | Eisenhower Matrix, analytics, settings, full task engine |
| **V3** | Intelligence | AI challenges, chatbot, smart suggestions |
| **V4** | Integration | WhatsApp, Google Calendar, Meet, location-based |

---

## 📦 Tech Stack (Frozen)

### Frontend (Web)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Vanilla CSS with CSS Variables (fully customizable)
- **State Management**: React Context + useReducer (no external libs initially)
- **Notifications**: Web Push API + Service Workers

### Frontend (Android)
- **Framework**: Native Kotlin/Jetpack Compose
- **Architecture**: MVVM + Clean Architecture
- **Notifications**: Firebase Cloud Messaging (FCM)
- **Local**: WorkManager for scheduled tasks

### Backend & Database
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication (Google + Email)
- **Storage**: Firebase Storage (future - for attachments)
- **Functions**: Firebase Cloud Functions (for carry-forward logic)
- **Hosting**: Vercel (Web) + Firebase (APIs)

### AI (V3+)
- **Primary**: OpenRouter API (multi-model access)
- **Fallback**: Hugging Face Inference API
- **Models**: Claude Haiku, GPT-4.1-mini, Mixtral, LLaMA-3

---

## 🗂️ Project Structure

```
bhoolgaya/
│
├── web/                          # Next.js Web Application
│   ├── app/                      # App Router pages
│   │   ├── (auth)/              # Auth pages (login, signup)
│   │   ├── (app)/               # Main app pages
│   │   │   ├── dashboard/       # Home dashboard
│   │   │   ├── tasks/           # Task management
│   │   │   ├── analytics/       # Analytics dashboard
│   │   │   ├── settings/        # User settings
│   │   │   └── matrix/          # Eisenhower Matrix view
│   │   ├── api/                 # API routes
│   │   └── layout.tsx           # Root layout
│   │
│   ├── components/              # Reusable components
│   │   ├── ui/                  # Base UI components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── Badge/
│   │   ├── tasks/               # Task-specific components
│   │   │   ├── TaskCard/
│   │   │   ├── TaskList/
│   │   │   ├── TaskForm/
│   │   │   └── TaskMatrix/
│   │   ├── layout/              # Layout components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   └── Footer/
│   │   └── analytics/           # Analytics components
│   │
│   ├── lib/                     # Core logic & utilities
│   │   ├── firebase/            # Firebase configuration
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   ├── types/               # TypeScript types
│   │   └── constants/           # App constants
│   │
│   ├── styles/                  # CSS files
│   │   ├── globals.css          # Global styles & variables
│   │   ├── components/          # Component-specific CSS
│   │   └── themes/              # Theme files (dark/light)
│   │
│   ├── public/                  # Static assets
│   └── package.json
│
├── android/                     # Native Android Application
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/bhoolgaya/
│   │   │   │   ├── data/        # Data layer
│   │   │   │   │   ├── model/
│   │   │   │   │   ├── repository/
│   │   │   │   │   └── source/
│   │   │   │   ├── domain/      # Business logic
│   │   │   │   │   ├── usecase/
│   │   │   │   │   └── model/
│   │   │   │   ├── presentation/ # UI layer
│   │   │   │   │   ├── ui/
│   │   │   │   │   ├── viewmodel/
│   │   │   │   │   └── components/
│   │   │   │   ├── service/     # Background services
│   │   │   │   └── di/          # Dependency injection
│   │   │   └── res/
│   │   └── build.gradle.kts
│   └── build.gradle.kts
│
├── shared/                      # Shared types & constants
│   ├── types/
│   └── constants/
│
├── firebase/                    # Firebase configuration
│   ├── functions/               # Cloud Functions
│   ├── firestore.rules
│   └── firebase.json
│
├── docs/                        # Documentation
│   ├── VERSION_1.md
│   ├── VERSION_2.md
│   ├── VERSION_3.md
│   ├── VERSION_4.md
│   └── API.md
│
└── README.md
```

---

## 📊 Data Models

### Core Task Model (All Versions)

```typescript
interface Task {
  // Core identification
  id: string;
  userId: string;
  
  // Task content
  title: string;
  description?: string;
  
  // Scheduling
  taskDate: Date;           // When task is due
  createdAt: Date;
  completedAt?: Date;
  
  // Status & aging
  status: 'pending' | 'completed';
  ageInDays: number;        // Auto-calculated
  
  // Priority (Eisenhower Matrix)
  important: boolean;
  urgent: boolean;
  
  // Carry-forward tracking
  originalDate: Date;       // First scheduled date
  carryForwardCount: number;
  
  // Reminders
  reminderEnabled: boolean;
  reminderInterval: 15 | 30 | 60 | 120 | 'custom';
  customReminderMinutes?: number;
  
  // Source tracking (V3+)
  source: 'manual' | 'chatbot' | 'calendar' | 'whatsapp' | 'ai_challenge';
  sourceReference?: string;
  confidenceScore?: number;
  
  // Location (V4)
  preferredLocation?: 'home' | 'college' | 'anywhere' | string;
  remoteAllowed: boolean;
  
  // Metadata
  category?: string;
  tags?: string[];
}
```

### User Settings Model

```typescript
interface UserSettings {
  userId: string;
  
  // Reminder preferences
  defaultReminderInterval: 15 | 30 | 60 | 120;
  vibrationEnabled: boolean;
  vibrationDuration: 5 | 1;  // seconds
  quietHoursStart?: string;  // "22:00"
  quietHoursEnd?: string;    // "07:00"
  
  // Notification preferences
  notificationsEnabled: boolean;
  freeModeNotification: boolean;
  dailyDigestEnabled: boolean;
  
  // Display preferences
  theme: 'light' | 'dark' | 'system';
  showCompletedTasks: boolean;
  defaultView: 'list' | 'matrix';
  
  // Default daily tasks
  dailyDefaultTasks: DailyTask[];
  
  // Locations (V4)
  locations?: Location[];
  
  // Privacy (V4)
  whatsappGroups?: WhatsAppGroup[];
}

interface DailyTask {
  id: string;
  title: string;
  important: boolean;
  urgent: boolean;
  enabled: boolean;
}

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;  // meters
}

interface WhatsAppGroup {
  id: string;
  name: string;
  enabled: boolean;
  keywords?: string[];
}
```

### Analytics Model

```typescript
interface DailyAnalytics {
  date: Date;
  userId: string;
  
  tasksCreated: number;
  tasksCompleted: number;
  tasksCarriedForward: number;
  
  // By age
  redTasksCleared: number;
  blueTasksCleared: number;
  yellowTasksCleared: number;
  
  // By matrix quadrant
  q1Completed: number;  // Important + Urgent
  q2Completed: number;  // Important + Not Urgent
  q3Completed: number;  // Not Important + Urgent
  q4Completed: number;  // Not Important + Not Urgent
  
  // Time spent (future)
  productiveMinutes?: number;
  
  // Source breakdown (V3+)
  tasksBySource?: Record<string, number>;
}
```

---

## 🎨 Design System (CSS Variables)

```css
/* globals.css - Design System */

:root {
  /* Colors - BhoolGaya? Brand */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #1a1a24;
  --bg-hover: #22222e;
  
  --text-primary: #ffffff;
  --text-secondary: #a0a0b0;
  --text-muted: #606070;
  
  --accent-primary: #6366f1;    /* Indigo */
  --accent-secondary: #8b5cf6;  /* Purple */
  --accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
  
  /* Task Age Colors */
  --task-today: #ffffff;
  --task-yesterday: #fbbf24;    /* Yellow */
  --task-2days: #3b82f6;        /* Blue */
  --task-critical: #ef4444;     /* Red */
  --task-completed: #22c55e;    /* Green */
  
  /* Matrix Quadrant Colors */
  --q1-do-now: #ef4444;         /* Red - Important + Urgent */
  --q2-schedule: #3b82f6;       /* Blue - Important + Not Urgent */
  --q3-delegate: #fbbf24;       /* Yellow - Not Important + Urgent */
  --q4-eliminate: #6b7280;      /* Gray - Not Important + Not Urgent */
  
  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* Z-Index Scale */
  --z-dropdown: 100;
  --z-modal: 200;
  --z-notification: 300;
}

/* Light Theme Override */
[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-card: #ffffff;
  --bg-hover: #f1f5f9;
  
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

---

## 🔔 Notification System Design

### Notification Types

```typescript
type NotificationType = 
  | 'task_reminder'      // Regular reminder
  | 'urgent_task'        // Red/critical task
  | 'carry_forward'      // Tasks moved to next day
  | 'free_mode'          // All tasks completed
  | 'ai_challenge'       // Daily AI challenge
  | 'daily_digest'       // Weekly summary
  | 'motivation';        // Encouragement

interface BhoolGayaNotification {
  type: NotificationType;
  title: string;         // Always starts with "BhoolGaya?"
  body: string;
  taskId?: string;
  vibrationDuration: number;
  priority: 'low' | 'normal' | 'high';
}
```

### Notification Messages (Brand Voice)

```typescript
const NOTIFICATION_TEMPLATES = {
  // Task reminders
  task_reminder: [
    "BhoolGaya? You wanted to finish this today.",
    "BhoolGaya? This task is waiting for you.",
    "BhoolGaya? Just a gentle reminder.",
  ],
  
  // Urgent/overdue tasks
  urgent_task: [
    "BhoolGaya? Yesterday's task is still waiting.",
    "BhoolGaya? This task has been pending for 2 days.",
    "BhoolGaya? Critical task needs your attention.",
  ],
  
  // Carry forward
  carry_forward: [
    "BhoolGaya? 3 tasks moved to tomorrow. Fresh start!",
    "BhoolGaya? Some tasks carried forward. No pressure.",
  ],
  
  // Free mode (all completed)
  free_mode: [
    "BhoolGaya? Nope! You completed everything. You're free now.",
    "BhoolGaya? All done! Want to learn something new?",
    "BhoolGaya? Great job! Time for yourself now.",
  ],
  
  // AI challenge
  ai_challenge: [
    "BhoolGaya? Today's learning challenge is ready!",
    "BhoolGaya? New concept to explore today.",
  ],
  
  // Motivation
  motivation: [
    "BhoolGaya? One small step is all you need.",
    "BhoolGaya? You've got this. Start with one task.",
    "BhoolGaya? Progress over perfection.",
  ],
};
```

---

## 📋 VERSION 1: Foundation

### Timeline: Week 1-3

### Features

#### 1.1 Authentication
- [ ] Firebase Auth setup
- [ ] Google Sign-in
- [ ] Email/Password login
- [ ] Protected routes
- [ ] Auth context provider

#### 1.2 Basic Task Management
- [ ] Create task (title, description, date)
- [ ] View tasks list
- [ ] Mark task as complete
- [ ] Delete task
- [ ] Edit task

#### 1.3 Task Aging System
- [ ] Auto-calculate `ageInDays`
- [ ] Color coding by age:
  - ⚪ White: Today
  - 🟡 Yellow: 1 day old
  - 🔵 Blue: 2 days old
  - 🔴 Red: 3+ days old
- [ ] Sort tasks by age (oldest first)

#### 1.4 Carry-Forward Logic
- [ ] Firebase Cloud Function: Run at midnight
- [ ] Move pending tasks to next day
- [ ] Increment `carryForwardCount`
- [ ] Increment `ageInDays`
- [ ] Preserve `originalDate`

#### 1.5 Basic Reminders
- [ ] Set reminder interval per task
- [ ] Web Push notifications
- [ ] Service Worker setup
- [ ] Notification permission request

#### 1.6 Settings (Basic)
- [ ] Default reminder interval
- [ ] Theme toggle (dark/light)
- [ ] Notification toggle

### UI Screens (V1)

1. **Login/Signup Page**
2. **Dashboard (Task List)**
3. **Add/Edit Task Modal**
4. **Settings Page**

### API Routes (V1)

```
POST   /api/auth/login
POST   /api/auth/signup
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/settings
PUT    /api/settings
```

---

## 📋 VERSION 2: Advanced Features

### Timeline: Week 4-6

### Features

#### 2.1 Eisenhower Matrix
- [ ] Add `important` and `urgent` fields
- [ ] Matrix view UI (4 quadrants)
- [ ] Quick toggle for importance/urgency
- [ ] Filter tasks by quadrant
- [ ] Visual indicators on task cards

#### 2.2 Advanced Reminders
- [ ] Custom reminder intervals
- [ ] Vibration settings (5s / 1s)
- [ ] Quiet hours configuration
- [ ] Reminder snooze option

#### 2.3 Default Daily Tasks
- [ ] Configure default tasks in settings
- [ ] Auto-create daily tasks at midnight
- [ ] Enable/disable individual defaults
- [ ] Examples: DSA, Self-learning, Health

#### 2.4 Free Mode Notification
- [ ] Detect when all tasks completed
- [ ] Show growth suggestion notification
- [ ] One-time per day (no spam)
- [ ] Customizable suggestions

#### 2.5 Analytics Dashboard
- [ ] Tasks completed per day (chart)
- [ ] Carry-forward rate
- [ ] Best productive day
- [ ] Weekly comparison
- [ ] Streak tracking

#### 2.6 Categories & Tags
- [ ] Add category to tasks
- [ ] Custom tags
- [ ] Filter by category/tag
- [ ] Category-wise analytics

### UI Screens (V2)

1. **Eisenhower Matrix View**
2. **Analytics Dashboard**
3. **Advanced Settings**
4. **Category Manager**
5. **Daily Defaults Config**

---

## 📋 VERSION 3: AI Integration

### Timeline: Week 7-9

### Features

#### 3.1 AI Daily Challenge
- [ ] OpenRouter API integration
- [ ] Generate daily learning challenge
- [ ] Topics: DSA, concepts, trending tech
- [ ] Store as special task type
- [ ] Morning notification

#### 3.2 Chatbot Interface
- [ ] Chat UI component
- [ ] Natural language task creation
- [ ] Intent detection (LLM)
- [ ] Extract: title, date, urgency
- [ ] Confidence score display

#### 3.3 Smart Suggestions
- [ ] Suggest best time for task types
- [ ] Pattern recognition (user behavior)
- [ ] Task clustering
- [ ] Priority recommendations

#### 3.4 LLM Pipeline
- [ ] OpenRouter abstraction layer
- [ ] Model fallback system
- [ ] Token usage optimization
- [ ] Caching responses
- [ ] Rate limiting

### AI Configuration

```typescript
const AI_CONFIG = {
  provider: 'openrouter',
  models: {
    primary: 'anthropic/claude-3-haiku',
    fallback: 'mistralai/mixtral-8x7b',
    powerful: 'openai/gpt-4.1-mini',
  },
  maxTokens: 500,
  temperature: 0.7,
};
```

### Prompt Templates

```typescript
const PROMPTS = {
  taskExtraction: `
    Extract task information from the following message.
    Return JSON with: title, date, important (bool), urgent (bool).
    If unsure, set confidence < 0.7.
    Message: {input}
  `,
  
  dailyChallenge: `
    Generate a learning challenge for a computer science student.
    Topic areas: DSA, System Design, Web Dev, AI/ML.
    Return: title, description, estimated_time, difficulty.
    Make it relevant to current industry trends.
  `,
};
```

---

## 📋 VERSION 4: Platform Integration

### Timeline: Week 10-14

### Features

#### 4.1 Google Calendar Integration
- [ ] OAuth2 setup
- [ ] Sync tasks to calendar
- [ ] Create calendar events from tasks
- [ ] Import calendar events as tasks

#### 4.2 Google Meet Integration
- [ ] Auto-generate Meet links
- [ ] Attach to meeting tasks
- [ ] One-click join

#### 4.3 WhatsApp Task Ingestion
- [ ] Message forwarding approach (privacy-first)
- [ ] Keyword detection
- [ ] Task extraction from messages
- [ ] Source reference tracking
- [ ] Group whitelist in settings

#### 4.4 Location-Based Suggestions
- [ ] Location configuration
- [ ] Geofencing (500m radius)
- [ ] Task-location matching
- [ ] Suggestion (not restriction)
- [ ] Manual override always

#### 4.5 Native Android App
- [ ] Kotlin + Jetpack Compose
- [ ] Firebase integration
- [ ] Background sync
- [ ] Rich notifications
- [ ] Vibration patterns
- [ ] Widget support

### Privacy Controls (V4)

```typescript
interface PrivacySettings {
  whatsapp: {
    enabled: boolean;
    allowedGroups: string[];
    blockedGroups: string[];
    keywordsOnly: boolean;
    keywords: string[];
  };
  location: {
    enabled: boolean;
    trackingFrequency: 'always' | 'app_open' | 'never';
  };
  calendar: {
    enabled: boolean;
    readOnly: boolean;
  };
}
```

---

## 🔄 Firebase Cloud Functions

### Carry-Forward Function

```typescript
// functions/src/carryForward.ts
export const dailyCarryForward = functions.pubsub
  .schedule('0 0 * * *')  // Midnight every day
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Get all pending tasks from yesterday
    const pendingTasks = await db.collection('tasks')
      .where('status', '==', 'pending')
      .where('taskDate', '<', today)
      .get();
    
    const batch = db.batch();
    
    pendingTasks.forEach(doc => {
      const task = doc.data();
      batch.update(doc.ref, {
        taskDate: today,
        ageInDays: task.ageInDays + 1,
        carryForwardCount: task.carryForwardCount + 1,
      });
    });
    
    await batch.commit();
    
    // Send carry-forward notifications
    // ...
  });
```

### Default Tasks Creation

```typescript
// functions/src/dailyTasks.ts
export const createDailyTasks = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    const users = await db.collection('users').get();
    
    for (const userDoc of users.docs) {
      const settings = await db.collection('settings')
        .doc(userDoc.id)
        .get();
      
      const defaults = settings.data()?.dailyDefaultTasks || [];
      
      for (const defaultTask of defaults) {
        if (defaultTask.enabled) {
          await db.collection('tasks').add({
            userId: userDoc.id,
            title: defaultTask.title,
            status: 'pending',
            taskDate: new Date(),
            important: defaultTask.important,
            urgent: defaultTask.urgent,
            createdAt: new Date(),
            source: 'default',
            ageInDays: 0,
            carryForwardCount: 0,
          });
        }
      }
    }
  });
```

---

## 🚀 Development Phases

### Phase 1: Setup (Day 1-2)
- [ ] Initialize Next.js project
- [ ] Setup Firebase project
- [ ] Configure Firestore
- [ ] Setup authentication
- [ ] Create base component library
- [ ] Implement design system CSS

### Phase 2: Core V1 (Day 3-10)
- [ ] Build authentication flow
- [ ] Implement task CRUD
- [ ] Build task list UI
- [ ] Add aging system
- [ ] Setup Cloud Functions
- [ ] Implement notifications

### Phase 3: Polish V1 (Day 11-14)
- [ ] Responsive design
- [ ] Error handling
- [ ] Loading states
- [ ] Testing
- [ ] Bug fixes
- [ ] Performance optimization

### Phase 4: V2 Features (Day 15-28)
- [ ] Eisenhower Matrix
- [ ] Analytics Dashboard
- [ ] Advanced settings
- [ ] Category system
- [ ] Daily defaults

### Phase 5: V3 AI Integration (Day 29-42)
- [ ] OpenRouter integration
- [ ] Chatbot UI
- [ ] AI challenges
- [ ] Smart suggestions

### Phase 6: V4 Integrations (Day 43-60)
- [ ] Google Calendar
- [ ] WhatsApp (forwarding)
- [ ] Location features
- [ ] Android app MVP

---

## 📱 Android App Architecture

### Tech Stack
- **Language**: Kotlin
- **UI**: Jetpack Compose
- **Architecture**: MVVM + Clean Architecture
- **DI**: Hilt
- **Database**: Room (local cache)
- **Network**: Retrofit + OkHttp
- **Firebase**: Auth, Firestore, FCM

### Gradle Dependencies

```kotlin
// build.gradle.kts (app)
dependencies {
    // Core
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    
    // Compose
    implementation(platform("androidx.compose:compose-bom:2024.01.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation("androidx.navigation:navigation-compose:2.7.6")
    
    // Firebase
    implementation(platform("com.google.firebase:firebase-bom:32.7.0"))
    implementation("com.google.firebase:firebase-auth-ktx")
    implementation("com.google.firebase:firebase-firestore-ktx")
    implementation("com.google.firebase:firebase-messaging-ktx")
    
    // Room
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    kapt("androidx.room:room-compiler:2.6.1")
    
    // Hilt
    implementation("com.google.dagger:hilt-android:2.50")
    kapt("com.google.dagger:hilt-compiler:2.50")
    implementation("androidx.hilt:hilt-navigation-compose:1.1.0")
    
    // WorkManager
    implementation("androidx.work:work-runtime-ktx:2.9.0")
}
```

---

## 🔐 Security Rules (Firestore)

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only access their own data
    match /tasks/{taskId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.userId;
    }
    
    match /settings/{userId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == userId;
    }
    
    match /analytics/{docId} {
      allow read: if request.auth != null 
        && request.auth.uid == resource.data.userId;
      allow write: if false;  // Only Cloud Functions write
    }
  }
}
```

---

## 📊 Key Performance Indicators (KPIs)

### User Success Metrics
- Daily active usage
- Task completion rate
- Carry-forward reduction over time
- Streak maintenance
- Feature adoption

### Technical Metrics
- Page load time < 2s
- Notification delivery rate > 95%
- API response time < 500ms
- Crash rate < 0.1%

---

## 🎯 Success Definition

**BhoolGaya? succeeds when:**

1. ✅ User never forgets important tasks
2. ✅ Tasks from ALL sources are captured
3. ✅ Reminders feel helpful, not annoying
4. ✅ AI enhances without overwhelming
5. ✅ Privacy is preserved always
6. ✅ Works seamlessly across devices
7. ✅ Student life becomes more organized

---

## 📌 Ready to Build

This master plan is now locked. When you say **"Start the coding"**, we begin with:

1. **Initialize Next.js project** with TypeScript
2. **Setup Firebase** project and configuration
3. **Create design system** CSS
4. **Build base component library**
5. **Implement authentication**

The foundation must be strong before we add features.

---

*"BhoolGaya? If a task exists anywhere, it exists here."*
