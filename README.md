# UnityServe – Community-Driven Social Development Events Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-F59E0B?style=for-the-badge&logo=auth0&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Bringing People Together for Real Social Impact.**  
A fullstack community event management platform where citizens can discover, host, and participate in local social service drives across Bangladesh and beyond.

[🌐 **Live Website**](https://unity-serve-client.vercel.app) • [🖥️ **Backend REST API**](https://unity-serve-server-amber.vercel.app) • [📂 **Server Repository**](https://github.com/devabunayem/unity-serve-server)

</div>

---

## 📖 Project Overview

**UnityServe** connects grassroots volunteers with meaningful social development initiatives in their neighborhoods. From winter clothing drives across Dhaka to urban tree plantations and emergency medical camps, the platform empowers community leaders to publish events with strict date validation and lets volunteers RSVP with a single click, track their social footprint, and receive a verified participation credential.

- **Client Live Site:** [https://unity-serve-client.vercel.app](https://unity-serve-client.vercel.app)
- **Backend API Base:** [https://unity-serve-server-amber.vercel.app](https://unity-serve-server-amber.vercel.app)
- **Client GitHub Repository:** [https://github.com/devabunayem/unity-serve-client](https://github.com/devabunayem/unity-serve-client)
- **Server GitHub Repository:** [https://github.com/devabunayem/unity-serve-server](https://github.com/devabunayem/unity-serve-server)

---

## 🌟 Key Features

- 🔍 **Strictly Upcoming Event Discovery:**  
  Real-time search and category filtering (Winter Aid, Tree Plantation, Cleanup, Blood Donation, Healthcare, etc.). Events whose dates have passed are automatically filtered out by MongoDB so users only explore active, actionable initiatives.

- ⚡ **Dynamic Home Page with MongoDB `.limit(6)`:**  
  A curated spotlight section displaying the nearest 6 upcoming events queried dynamically from MongoDB, paired with a visual how-it-works roadmap and real volunteer field moments.

- 🤝 **Seamless 1-Click Volunteer RSVP:**  
  Logged-in members can confirm attendance with one click. The backend prevents duplicate joining, blocks past event registrations, and automatically tallies volunteer participants.

- 🛡️ **Host & Command Center (Create, Update & Delete):**  
  Event organizers can host new drives with strict future-date validation. A private management suite allows hosts to edit event logistics in an interactive modal or safely delete them with SweetAlert2 confirmation dialogs.

- 📜 **Printable Volunteer Service Pass (Bonus Feature):**  
  Volunteers can view and print an official, certificate-style **Volunteer Service Pass** with verified details and printable styles for their social portfolio and CV.

- 🎨 **Apple-Inspired 60:30:10 Design & Full Dark Mode:**  
  Engineered with a clean 60:30:10 palette: 60% clean canvas white (`#FFFFFF` / `#F8FAFC`), 30% structural Trust Blue (`#1E40AF` / `#2563EB`), and 10% luminous Amber Gold (`#F59E0B` / `#FBBF24`). Fully toggleable between crisp light mode and midnight dark mode.

- 🔒 **Zero-Error Reloading & Route Protection:**  
  Private pages (`/events/create`, `/events/manage`, `/events/joined`, `/profile`) are protected with `PrivateRoute` guards. Session hydration ensures that logged-in users are never prematurely redirected to login upon page refresh.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)
| Technology | Role |
| :--- | :--- |
| **Next.js (App Router)** | Modern React framework with server rendering & routing |
| **TypeScript** | Type-safe development with strict compiler checks |
| **Tailwind CSS v4** | Utility-first styling with modern responsive grids |
| **Better Auth (Client)** | High-security authentication with Google & GitHub OAuth |
| **Lucide React** | Clean vector iconography (including the modern **X** icon) |
| **React Hot Toast & SweetAlert2** | Interactive toast notifications & confirmation modals |

### Backend (Server)
| Technology | Role |
| :--- | :--- |
| **Node.js & Express.js** | Lightweight, high-throughput REST API server |
| **MongoDB Atlas** | Native MongoDB driver for high-performance querying |
| **JSON Web Token (JWT)** | Secure token-based API authorization |
| **Cookie-Parser & CORS** | Cross-origin resource sharing & HTTP-only cookies |

---

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/devabunayem/unity-serve-client.git
cd unity-serve-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
