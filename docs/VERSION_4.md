# 📋 VERSION 4: Platform Integration

> **Focus**: WhatsApp, Google Calendar/Meet, location-based, Android app

---

## 🎯 Version 4 Goals

1. WhatsApp task ingestion (privacy-first)
2. Google Calendar sync
3. Google Meet auto-links
4. Location-based suggestions
5. Native Android app (Kotlin + Jetpack Compose)

---

## ✅ Feature Checklist

### 4.1 WhatsApp Integration (Privacy-First)
- [ ] Forward-based approach (user forwards messages)
- [ ] Keyword detection (task:, assignment:, deadline:)
- [ ] Group whitelist in settings
- [ ] Source reference tracking
- [ ] Confidence score for extraction

### 4.2 Google Calendar
- [ ] OAuth2 setup
- [ ] Sync tasks to calendar events
- [ ] Import calendar events as tasks
- [ ] Two-way sync option

### 4.3 Google Meet
- [ ] Auto-generate Meet links for meetings
- [ ] Attach link to task
- [ ] One-click join

### 4.4 Location-Based Suggestions
- [ ] Configure locations (Home, College)
- [ ] Geofencing (500m radius)
- [ ] Suggest relevant tasks by location
- [ ] Manual override always allowed
- [ ] Never restrict, only suggest

### 4.5 Native Android App
- [ ] Kotlin + Jetpack Compose
- [ ] MVVM + Clean Architecture
- [ ] Firebase integration
- [ ] Rich notifications with vibration
- [ ] Background task sync
- [ ] Widget support

---

## 🔐 Privacy Controls

```typescript
interface PrivacySettings {
  whatsapp: {
    enabled: boolean;
    allowedGroups: string[];
    keywordsOnly: boolean;  // Only process messages with keywords
  };
  location: {
    enabled: boolean;
    trackingFrequency: 'app_open' | 'never';
  };
  calendar: {
    enabled: boolean;
    readOnly: boolean;
  };
}
```

**Privacy Principles:**
- User explicitly enables each integration
- Scoped access (only allowed groups/sources)
- Transparency (show source of each task)
- No data without consent

---

## 📱 Android App Structure

```
android/app/src/main/java/com/bhoolgaya/
├── data/           # Data layer - repositories, API
├── domain/         # Business logic - use cases
├── presentation/   # UI - screens, viewmodels
├── service/        # Background services, notifications
└── di/             # Dependency injection (Hilt)
```

**Tech Stack:**
- Kotlin, Jetpack Compose, Hilt
- Room (local cache), Retrofit
- Firebase Auth, Firestore, FCM
- WorkManager for scheduled tasks

---

## 🧩 Location Model

```typescript
interface Location {
  id: string;
  name: string;          // "Home", "College"
  latitude: number;
  longitude: number;
  radius: number;        // meters (default: 500)
}

// Task matching logic
if (userDistance <= location.radius) {
  suggestTasksForLocation(location.name);
}
// User can complete ANY task from anywhere - no restrictions
```

---

## 📋 Definition of Done

- [ ] WhatsApp forwarding creates tasks
- [ ] Google Calendar sync works
- [ ] Meet links auto-generate
- [ ] Location suggestions work
- [ ] Android app is functional
- [ ] All V1/V2/V3 features work

---

*BhoolGaya? Version 4 - Full Platform Integration* 🌐
