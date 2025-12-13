# ScheduleLinux

> **An Interactive CPU Scheduling Algorithm Simulator built with React + Vite**

🔗 **Live Demo:**  
https://anjuraghuwanshi.github.io/SheduleLinux/

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🔁 Algorithms Supported](#-algorithms-supported)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [▶️ Running Locally](#️-running-locally)
- [🏗 Build](#-build)
- [🌍 Deployment (GitHub Pages)](#-deployment-github-pages)
- [🧭 Routes](#-routes)
- [ℹ️ About Page](#️-about-page)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ Features

- 🎯 Interactive CPU scheduling simulation
- 📊 Gantt chart visualization
- 🧵 Ready Queue animation
- ⏱ Step-by-step execution
- 🎛 Algorithm-based dynamic inputs  
  *(Quantum & Priority fields appear only when needed)*
- ⚡ Smooth UI animations
- 📱 Responsive design for all screens
- 📘 Beginner-friendly for OS learners

⬆️ [Back to Top](#-table-of-contents)

---

## 🔁 Algorithms Supported

- **FCFS** – First Come First Serve  
- **SJF** – Shortest Job First  
- **Round Robin (RR)** – Uses Time Quantum  
- **Priority Scheduling** – Preemptive  
- **MLFQ** – Multi-Level Feedback Queue  

⬆️ [Back to Top](#-table-of-contents)

---

## 🛠 Tech Stack

- **React** (UI)
- **Vite** (Fast build tool)
- **Tailwind CSS** (Styling)
- **React Router DOM** (Routing)
- **Framer Motion** (Animations)
- **GitHub Pages** (Deployment)

⬆️ [Back to Top](#-table-of-contents)

---

## 📂 Project Structure

```txt
src/
├── algorithms/
│   ├── fcfs.js
│   ├── sjf.js
│   ├── rr.js
│   ├── priority.js
│   └── mlfq.js
│
├── components/
│   ├── GuideModal.jsx
│   ├── ProcessForm.jsx
│   └── SimulationGantt.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Scheduler.jsx
│   └── About.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```




## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js **v18+**
* npm or yarn

⬆️ [Back to Top](#-table-of-contents)

---

## ▶️ Running Locally

### Clone the repository

```bash
git clone https://github.com/anjuraghuwanshi/SheduleLinux.git
cd SheduleLinux
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Open in browser

```
http://localhost:5173
```

⬆️ [Back to Top](#-table-of-contents)

---

## 🏗 Build

### Create production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

⬆️ [Back to Top](#-table-of-contents)

---

## 🌍 Deployment (GitHub Pages)

### Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Update `package.json`

```json
"homepage": "https://anjuraghuwanshi.github.io/SheduleLinux/",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Update `vite.config.js`

```js
export default defineConfig({
  base: "/SheduleLinux/",
  plugins: [react(), tailwindcss()],
});
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

⬆️ [Back to Top](#-table-of-contents)

---

## 🧭 Routes

```txt
/            → Home
/scheduler   → Scheduling Simulator
/about       → About Page
```

⬆️ [Back to Top](#-table-of-contents)

---


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:

```bash
git checkout -b feature/new-feature
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push and open a Pull Request



<p align="center">⭐ If you like this project, consider giving it a star!</p>
