# Royal Wedding Invitation Suite 💍

Digital wedding invitation applications for the royal wedding celebration of **Harshita Dubey & Satyam Pathak**.

This monorepo contains both sides of the digital invitation:
- **`wedding-invitation-bride/`**: The Bride's side invitation (*Harshita Dubey & Satyam Pathak*)
- **`wedding-invitation-groom/`**: The Groom's side invitation (*Satyam Pathak & Harshita Dubey*)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
Install dependencies for each application:
```bash
# Install bride app dependencies
cd wedding-invitation-bride && npm install && cd ..

# Install groom app dependencies
cd wedding-invitation-groom && npm install && cd ..
```

---

## 💻 Local Development

You can run both applications simultaneously or each independently:

### Run Both Concurrently
```bash
npm run dev:both
```
- **Bride Invitation**: http://localhost:3000
- **Groom Invitation**: http://localhost:3001

### Run Individually
- **Bride Invitation (Port 3000)**:
  ```bash
  npm run dev:bride
  ```
- **Groom Invitation (Port 3001)**:
  ```bash
  npm run dev:groom
  ```

---

## 📦 Building for Production

```bash
# Build bride app
npm run build:bride

# Build groom app
npm run build:groom
```

---

## 🎨 Tech Stack
- **React 19**
- **Vite 6**
- **TailwindCSS**
- **Motion (Framer Motion)**
- **Lucide Icons & Canvas Confetti**
