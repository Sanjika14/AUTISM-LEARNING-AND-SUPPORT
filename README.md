# Autism Learning & Support 🌟

> **College Final-Year Educational Project**

A polished, child-friendly, responsive, and accessible educational web application designed to support children with autism through simple learning activities, emotion recognition, picture-based communication, sensory/calming exercises, and educational games.

---

## 📌 Disclaimer
**Important Educational Notice:**
This website was created as a college educational project to support learning and awareness. It is **not** a substitute for professional medical, psychological, behavioral, educational, or therapeutic advice.

---

## ✨ Major Features

### 🎨 1. Learning Activities (`/learning`)
- **Colors Activity**: Learn 6 core colors (Red, Blue, Yellow, Green, Orange, Purple) with interactive quiz cards and friendly feedback ("Great job! ⭐").
- **Shapes Activity**: Explore round circles, 4-sided squares, pointy triangles, long rectangles, and 5-point stars.
- **Numbers Activity**: Learn numbers 1–10 with corresponding visual counting objects (e.g. 🍎 🍎 🍎).
- **Alphabet Activity**: Explore A–Z with readable letters, illustrative icons, and example sentences.
- **Matching Objects Activity**: Interactive click-based matching connecting words with pictures.
- **Identify Correct Picture**: Visual quiz identifying objects from multiple choices.

### 😊 2. Emotions (`/emotions`)
- Explore feelings (Happy, Sad, Angry, Scared, Excited, Calm) with gentle descriptions and example sentences.
- Interactive "How are you feeling today?" check-in selector without medical interpretations or diagnostic claims.

### 💬 3. Visual Communication Board (`/communication`)
- Picture communication cards for daily needs (Water 💧, Hungry 🍎, Help 🙋, Play ⚽, Tired 😴, Break 🌿, Yes ✅, No ❌).
- Integrated **Web Speech API (`🔊 Speak`)** to read selected phrases out loud.
- Clear selection button.

### 🌿 4. Sensory & Calming Space (`/sensory`)
- **Visual Deep Breathing Guide**: Animated expanding/shrinking breath indicator respecting `prefers-reduced-motion`.
- **Slow Counting (1–5)**: Self-paced counting exercise.
- **Quiet Time Timer**: 30-second, 1-minute, and 2-minute countdown options.
- **Calming Sounds**: Optional ambient sound toggles (Rain, Ocean Waves, Soft Piano) with play/pause and volume controls (No autoplay).
- **Simple Stretching**: Illustrated gentle stretching instructions.

### 🎮 5. Fun & Educational Games (`/games`)
- **Memory Matching**: 6-card memory card game with score tracking (`Matches: X / 3`).
- **Find the Same Picture**: Target picture matching game.
- **Identify Colors Game**: Quiz finding target colors.
- **Identify Shapes Game**: Quiz identifying target geometric shapes.
- **Simple Puzzles**: Fruit basket half-matching puzzle.

### 👥 6. Parents & Teachers Guide (`/parents-teachers`)
- Practical recommendations on visual schedules, predictable routines, clear instructions, processing time, and comfortable low-sensory spaces.

### ℹ️ 7. About & Contact (`/about`)
- Academic college project metadata (Project Title, Student Team, College Name, Faculty Guide, Academic Year).
- Interactive user feedback form stored in **Firebase Firestore** with safe offline fallback.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, JavaScript (JSX), CSS Custom Properties.
- **Icons**: Lucide React (`lucide-react`).
- **Backend & Database**: Firebase SDK (Firestore, Auth, Storage configuration).
- **Accessibility**: WCAG-inspired design (min 48px touch targets, readable 18px+ typography, high contrast, ARIA labels, focus states, reduced motion support).

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note**: The application includes a graceful fallback system. If Firebase environment variables are omitted, all interactive features continue to function seamlessly in demo mode.

---

## 🚀 Installation & Local Running

1. **Clone or navigate to project directory**:
   ```bash
   cd "AUTISM LEARNING AND SUPPORT"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

---

## 📦 Production Build

To compile the application for production deployment:

```bash
npm run build
```

The optimized build output will be generated in the `dist/` directory.

---

## 🌐 Deployment Options

### Deploying to Vercel
1. Install Vercel CLI (`npm i -g vercel`) or push your project repository to GitHub.
2. Import the repository in Vercel.
3. Configure the environment variables (`VITE_FIREBASE_...`).
4. Select **Vite** as the framework preset and deploy.

### Deploying to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize project: `firebase init hosting` (Set build directory to `dist`).
4. Build and deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---

## 📄 License & Academic Note
Created for academic project submission and educational demonstration purposes.
