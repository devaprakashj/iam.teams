# 🤝 Contributing to iam.teams

Welcome to the **iam.teams** project! This guide explains exactly how to contribute safely and effectively.
Please read this **before** writing a single line of code.

---

## 📋 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Getting Started](#getting-started)
3. [Branch Rules (IMPORTANT)](#branch-rules-important)
4. [Commit Guidelines](#commit-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Code Review](#code-review)
7. [Contact](#contact)
8. [Instructions in Tamil (தமிழில் வழிமுறைகள்)](#instructions-in-tamil)

---

## 🛠 Tech Stack

| Area       | Technology              |
|------------|-------------------------|
| Frontend   | React (Vite)            |
| Styling    | Tailwind CSS            |
| Language   | TypeScript / JavaScript |
| Version Control | Git + GitHub      |

> ⚠️ **Do NOT use any technology outside of the above list without approval from the admin (devaprakashj).**

---

## 🚀 Getting Started

Follow these steps **in order** to set up the project on your local machine.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/devaprakashj/iam.teams.git
cd iam.teams
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Initialize the Frontend (First Time Only)

If the project is still empty (no `src/` folder), set up the Vite + React project:

```bash
npm create vite@latest . -- --template react
npm install
```

### Step 4 — Run the App Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🌿 Branch Rules (IMPORTANT)

> ❌ **NEVER push directly to `main`.** This is strictly enforced.

Always create a **new branch** for your work. Use the naming format below:

| Task Type       | Branch Name Format             | Example                    |
|-----------------|-------------------------------|----------------------------|
| New Feature     | `feature/your-feature-name`   | `feature/login-page`       |
| Bug Fix         | `fix/issue-description`       | `fix/navbar-overlap`       |
| UI/Styling      | `ui/component-name`           | `ui/dashboard-layout`      |
| Initial Setup   | `frontend-setup`              | `frontend-setup`           |

### How to Create a Branch

```bash
# Make sure you are on an updated main first
git checkout main
git pull origin main

# Create and switch to your new branch
git checkout -b feature/your-feature-name
```

---

## 💬 Commit Guidelines

Write **clear, meaningful** commit messages. Follow this format:

```
type: short description of what you did
```

### Commit Types

| Type       | When to Use                              |
|------------|------------------------------------------|
| `feat`     | Adding a new feature                     |
| `fix`      | Fixing a bug                             |
| `style`    | CSS / UI changes only                    |
| `refactor` | Code cleanup without adding features     |
| `docs`     | Updating documentation or README         |
| `chore`    | Config changes, dependency updates       |

### ✅ Good Examples

```bash
git commit -m "feat: add login page with form validation"
git commit -m "fix: correct routing for dashboard"
git commit -m "style: update navbar color and spacing"
```

### ❌ Bad Examples

```bash
git commit -m "changes"
git commit -m "done"
git commit -m "update"
```

---

## 📬 Pull Request Process

Once your feature or fix is ready, follow these steps to submit it for review:

### Step 1 — Stage and Commit Your Changes

```bash
git add .
git commit -m "feat: your meaningful message here"
```

### Step 2 — Push Your Branch to GitHub

```bash
git push origin your-branch-name
```

### Step 3 — Create a Pull Request on GitHub

1. Go to [github.com/devaprakashj/iam.teams](https://github.com/devaprakashj/iam.teams)
2. You will see a yellow banner: **"Compare & pull request"** — click it.
3. Fill in the PR template:
   - **Title**: Short summary of what you did
   - **Description**: What was changed and why
4. Click **"Create Pull Request"**

> ✅ The admin (devaprakashj) will review your PR, leave comments if needed, and merge it once approved.

---

## 🔍 Code Review

- The admin will review all Pull Requests before merging.
- You may be asked to make changes — this is **normal and expected**.
- Once approved, the admin will merge your branch into `main`.
- **Do not merge your own PRs.**

---

## 📞 Contact

If you have questions or are unsure about anything, contact the project admin before proceeding:

- **Admin:** devaprakashj
- **GitHub:** [github.com/devaprakashj](https://github.com/devaprakashj)

---

## 🗣 Instructions in Tamil (தமிழில் வழிமுறைகள்)

> இந்த Section Praveen-க்கு (Frontend Member) Tamil-ல் எழுதப்பட்டுள்ளது.

### படி 1 — Project-ஐ Clone பண்ணுங்க

```bash
git clone https://github.com/devaprakashj/iam.teams.git
cd iam.teams
```

### படி 2 — Dependencies Install பண்ணுங்க

```bash
npm install
```

### படி 3 — புது Branch Create பண்ணுங்க ⚠️

**நேரடியா `main` branch-ல வேலை செய்யாதீங்க.** எப்பவும் புது branch-ல வேலை செய்யணும்.

```bash
git checkout main
git pull origin main
git checkout -b frontend-setup
```

### படி 4 — Code எழுதிட்டு Push பண்ணுங்க

```bash
git add .
git commit -m "feat: initial frontend setup"
git push origin frontend-setup
```

### படி 5 — Pull Request குடுங்க

1. GitHub-ல போங்க: [github.com/devaprakashj/iam.teams](https://github.com/devaprakashj/iam.teams)
2. **"Compare & pull request"** Button-ஐ Click பண்ணுங்க.
3. என்ன பண்ணீங்க-ன்னு சுருக்கமா எழுதுங்க.
4. **"Create Pull Request"** Click பண்ணுங்க.

Admin (devaprakashj) உங்க Code-ஐ Review பண்ணி, சரியா இருந்தா Merge பண்ணுவாங்க.

---

> 🙏 Thank you for contributing to **iam.teams**! Follow these rules and we will build something great together.
