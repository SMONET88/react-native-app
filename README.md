# Pond-Chore-App 🦆

The **Pond-Chore-App** is a React Native application built to help track and manage weekly chores in our house. Some roommates are great at keeping up with chores, others not so much. So, this app makes it easy to assign tasks, track completions, and reward the whole house when we hit collective goals.

Our ZOHO group Calendar Link: https://calendar.zoho.com/zc/mn/20251130-20260103

---

## Features
- **Weekly chore assignments**: Randomly assigns chores to roommates every Sunday.
- **Points tracking**: Keeps a running tally of completed chores per roommate and for the house overall.
- **Zoho Calendar integration**: Automatically adds an event when someone completes a chore, so the house calendar stays updated.
- **Local persistence**: Uses AsyncStorage to save chores and points across app restarts.

## Setup & Installation
   ```bash
   git clone https://github.com/your-username/Pond-Chore-App.git
   cd Pond-Chore-App
   npm install
   npm run dev

Run app with: npx expo start --tunnel
to recieve an Expo Share link
