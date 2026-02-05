# 🎯 BhoolGaya?

> **"If a task exists anywhere, it exists here."**

A personal task management system that never forgets for you. Built for students and learners who juggle multiple sources of tasks and want intelligent, gentle reminders.

---

## 🌟 Philosophy

**BhoolGaya?** (Hindi: "Did you forget?") is not just another to-do app. It's a **personal memory system** that:

- ✅ **Captures tasks from everywhere** - manual, chat, WhatsApp, calendar
- ✅ **Never loses a task** - carry-forward logic ensures nothing is forgotten
- ✅ **Reminds gently** - friendly notifications, not annoying alarms
- ✅ **Respects your flow** - no rigid time slots, work on any task anytime
- ✅ **Grows with you** - AI challenges and smart suggestions
- ✅ **Protects privacy** - you control what the app can access

---

## 🔔 Notification Personality

```
🔴 "BhoolGaya? Yesterday's task is still waiting."
⏰ "BhoolGaya? You wanted to finish this today."
🎉 "BhoolGaya? Nope! You completed everything. You're free now."
🌱 "BhoolGaya? Try learning something new today."
```

---

## 🚀 Version Roadmap

| Version | Status | Focus |
|---------|--------|-------|
| **V1** | 🔄 Planned | Foundation - Tasks, aging, carry-forward, notifications |
| **V2** | 📋 Planned | Advanced - Eisenhower Matrix, analytics, daily defaults |
| **V3** | 📋 Planned | AI - Chatbot, daily challenges, smart suggestions |
| **V4** | 📋 Planned | Integrations - WhatsApp, Calendar, Meet, location |

---

## 🎨 Features

### Core Features (V1)
- ➕ Create/Edit/Delete tasks
- 🎨 Task aging with color coding (today → yellow → blue → red)
- 🔄 Automatic carry-forward at midnight
- 🔔 Customizable reminders (15m, 30m, 1h, 2h)
- 📳 Vibration settings (5s enabled, 1s fallback)

### Advanced Features (V2)
- ⊞ Eisenhower Matrix (Important/Urgent quadrants)
- 📊 Analytics dashboard with charts
- 📅 Default daily tasks (DSA, learning, health)
- 🎉 Free mode notification when all tasks done
- 🏷️ Categories and tags

### AI Features (V3)
- 🤖 Chatbot for natural language task creation
- 🧠 Daily AI learning challenges
- 💡 Smart suggestions based on patterns
- ✨ Confidence scores for AI-created tasks

### Integration Features (V4)
- 💬 WhatsApp task ingestion (privacy-first)
- 📅 Google Calendar sync
- 🎥 Google Meet auto-links
- 📍 Location-based suggestions
- 📱 Native Android app

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Web** | Next.js 14+, TypeScript, Vanilla CSS |
| **Android** | Kotlin, Jetpack Compose |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |
| **Functions** | Firebase Cloud Functions |
| **AI** | OpenRouter, Hugging Face |
| **Hosting** | Vercel (Web), Firebase |

---

## 📁 Project Structure

```
bhoolgaya/
├── web/              # Next.js web application
├── android/          # Native Android app
├── firebase/         # Cloud Functions & rules
├── shared/           # Shared types & constants
├── docs/             # Version documentation
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- (Optional) OpenRouter API key for AI features

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bhoolgaya.git
cd bhoolgaya

# Install web dependencies
cd web
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Run development server
npm run dev
```

---

## 📖 Documentation

- [Master Plan](./MASTER_PLAN.md) - Complete architecture and roadmap
- [Version 1](./docs/VERSION_1.md) - Foundation features
- [Version 2](./docs/VERSION_2.md) - Advanced features
- [Version 3](./docs/VERSION_3.md) - AI integration
- [Version 4](./docs/VERSION_4.md) - Platform integrations

---

## 🎯 Core Principles

1. **Privacy First** - User controls all data access
2. **Suggest, Don't Force** - AI and location only suggest, never restrict
3. **Gentle Reminders** - Friendly tone, not guilt-tripping
4. **Student-First** - Free tier friendly, practical for learners
5. **One Source of Truth** - All tasks in one place, from anywhere

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

---

## 📜 License

MIT License - Feel free to use and modify.

---

**Built with 💜 for students who want to remember everything without stress.**

*BhoolGaya? - If a task exists anywhere, it exists here.*
