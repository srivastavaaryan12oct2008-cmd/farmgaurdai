# 🌱 FarmGuard AI

### **Detect early. Decide locally. Farm smarter.**

> **An Edge-AI powered smart farming assistant for crop health, pest detection, intelligent irrigation, and climate-risk monitoring.**

FarmGuard AI is an intelligent agriculture platform designed to help farmers **detect problems early, understand field conditions, and take actionable decisions** using artificial intelligence, computer vision, environmental sensors, and edge computing.

Instead of relying entirely on cloud connectivity, FarmGuard AI follows an **edge-first approach**, allowing critical intelligence to run locally and continue functioning in areas with poor or intermittent internet connectivity.

---

## 🚜 The Problem

Modern agriculture faces several interconnected challenges:

* 🌡️ Increasing temperature and climate variability
* 💧 Inefficient water usage and irrigation
* 🦠 Crop diseases that are detected too late
* 🐛 Pest outbreaks
* 🌧️ Unpredictable rainfall and flooding
* 📡 Poor connectivity in rural areas
* 📊 Lack of accessible real-time field intelligence

A farmer may have access to large amounts of environmental data, but raw data alone isn't enough.

**The real problem is turning field data into a simple decision:**

> **What is happening? How serious is it? Why is it happening? What should I do next?**

FarmGuard AI is designed around solving that problem.

---

# 💡 Our Solution

FarmGuard AI combines **computer vision, environmental sensing, edge AI, risk analysis, and decision support** into a unified platform.

```text
        FIELD
          │
          ▼
 ┌──────────────────┐
 │ Camera + Sensors │
 └────────┬─────────┘
          │
          ▼
 ┌──────────────────────┐
 │      Edge AI         │
 │ Disease • Pest •     │
 │ Environmental Risk   │
 └──────────┬───────────┘
            │
            ▼
 ┌──────────────────────┐
 │ Intelligence Engine  │
 │ Risk + Recommendation│
 └──────────┬───────────┘
            │
            ▼
 ┌──────────────────────┐
 │ Farmer Application   │
 │ Alerts • Analytics   │
 │ Recommendations      │
 └──────────────────────┘
```

The platform is designed so that the farmer receives **actionable information instead of complicated technical data**.

---

# ✨ Core Features

## 🔬 AI Crop Disease Detection

Farmers can capture or upload an image of a crop.

FarmGuard AI analyzes the image and provides:

* Potential disease identification
* Confidence level
* Severity
* Explanation
* Recommended next action

### Example

```text
Crop: Tomato

Detected:
Early Blight

Confidence:
91%

Severity:
High

Recommendation:
Inspect surrounding plants and begin
appropriate disease-management measures.
```

---

## 🐛 Pest Detection

The system can analyze crop images for potential pest activity.

It is designed to support:

* Pest identification
* Detection confidence
* Risk classification
* Field-level alerts
* Recommended actions

This allows farmers to respond before a localized pest problem becomes a larger outbreak.

---

# 💧 Smart Irrigation

FarmGuard AI combines environmental information such as:

* Soil moisture
* Temperature
* Humidity
* Rainfall
* Water availability

to determine whether irrigation may be required.

Instead of simply displaying:

> **Soil Moisture: 31%**

the system aims to provide:

> 💧 **Irrigation Recommended**
> Soil moisture is below the configured threshold and rainfall has been insufficient.

---

# 🌦️ Climate & Environmental Risk

FarmGuard AI monitors environmental conditions and identifies potential agricultural risks.

Supported prototype scenarios include:

* 🌡️ Heat stress
* 🌧️ Heavy rainfall
* 🌊 Flood risk
* 💧 Water stress
* 🌱 Environmental crop stress

The goal is to provide farmers with **early warnings instead of post-event information**.

---

# 🚨 Intelligent Alert System

FarmGuard AI converts detected risks into actionable alerts.

Alerts can include:

| Severity     | Example                      |
| ------------ | ---------------------------- |
| 🟢 Healthy   | No immediate action required |
| 🟡 Warning   | Monitor crop conditions      |
| 🟠 Attention | Action recommended           |
| 🔴 Critical  | Immediate attention required |

Users can:

* View alerts
* Filter alerts
* Acknowledge alerts
* Resolve alerts
* Track unresolved issues

---

# 📊 Farm Analytics

The dashboard provides an overview of farm conditions through:

* Crop health trends
* Environmental conditions
* Irrigation information
* Risk history
* Alert history
* Field performance

This allows farmers and farm managers to understand how field conditions change over time.

---

# ⚡ Edge AI

One of the core ideas behind FarmGuard AI is **local intelligence**.

### Traditional architecture

```text
Camera
   │
   ▼
Internet
   │
   ▼
Cloud AI
   │
   ▼
Result
```

This creates a dependency on network connectivity.

### FarmGuard AI

```text
Camera
   │
   ▼
Edge Device
   │
   ├── AI Inference
   ├── Sensor Processing
   ├── Risk Analysis
   └── Local Alerts
          │
          ▼
       Farmer
```

When connectivity is available, the system can synchronize information for analytics and future cloud functionality.

### Supported device direction

The architecture is designed to support edge hardware such as:

* Raspberry Pi
* NVIDIA Jetson
* Other Linux-based edge devices

---

# 📴 Offline-First Design

Agricultural environments may not always have reliable connectivity.

FarmGuard AI therefore supports an architecture with states such as:

```text
ONLINE
OFFLINE
SYNCING
DEGRADED
ERROR
```

Critical local functionality can continue operating while disconnected, with synchronization occurring when connectivity is restored.

---

# 🧠 Decision Intelligence

FarmGuard AI follows a simple principle:

### Every AI result should answer four questions:

**1. WHAT?**

What was detected?

**2. HOW SERIOUS?**

How significant is the problem?

**3. WHY?**

What data contributed to the assessment?

**4. WHAT NEXT?**

What action should the farmer consider?

This transforms AI predictions into practical decision support.

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────────────┐
│                  FARM FIELD                  │
│                                              │
│   📷 Camera     🌱 Crop      📡 Sensors     │
│                           Soil • Temp • Humidity
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 EDGE DEVICE                  │
│                                              │
│  ┌────────────┐  ┌────────────────────────┐ │
│  │ Computer   │  │ Sensor Processing      │ │
│  │ Vision     │  │                        │ │
│  └─────┬──────┘  └───────────┬────────────┘ │
│        │                      │              │
│        └──────────┬───────────┘              │
│                   ▼                          │
│          ┌─────────────────┐                 │
│          │ Risk Engine     │                 │
│          └────────┬────────┘                 │
│                   ▼                          │
│          ┌─────────────────┐                 │
│          │ Recommendations │                 │
│          └─────────────────┘                 │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 FASTAPI                      │
│                                              │
│  Crop API • Pest API • Irrigation API       │
│  Climate API • Alerts API • Analytics API   │
└──────────────────────┬───────────────────────┘
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
      ┌──────────────┐    ┌───────────────┐
      │    SQLite    │    │ React Frontend│
      │   Database   │    │ / PWA         │
      └──────────────┘    └───────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Responsive UI
* Modern component-based architecture

## Backend

* Python
* FastAPI
* REST API
* SQLite

## Artificial Intelligence

* Python
* Computer Vision
* OpenCV
* YOLO-compatible architecture
* ONNX-compatible inference architecture

## Edge Computing

* Raspberry Pi / NVIDIA Jetson compatible architecture
* Local inference
* Offline operation
* Local sensor processing

## Sensors

Potential sensor inputs include:

* Soil moisture
* Temperature
* Humidity
* Rainfall
* Water level

---

# 📁 Project Structure

```text
FarmGuard-AI/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── screens/
│   └── services/
│
├── backend/
│   ├── main.py
│   ├── api/
│   ├── services/
│   ├── models/
│   └── database/
│
├── ai/
│   ├── models/
│   ├── inference/
│   └── preprocessing/
│
├── sensors/
│   ├── sensor_service.py
│   └── simulator.py
│
├── intelligence/
│   ├── irrigation.py
│   ├── climate_risk.py
│   └── recommendations.py
│
├── data/
│
├── models/
│
├── assets/
│
├── .env.example
├── requirements.txt
└── README.md
```

> The exact structure may evolve as the project moves from prototype to hardware deployment.

---

# 🖥️ Application Screens

The FarmGuard AI interface is designed around a farmer-first workflow.

### Dashboard

Provides an overview of:

* Farm health
* Active risks
* Irrigation status
* Environmental conditions
* Recent alerts

### Crop Scanner

Upload or capture a crop image and receive AI-based analysis.

### Smart Irrigation

View:

* Soil moisture
* Irrigation status
* Environmental conditions
* Irrigation recommendations

### Climate Risk

Monitor environmental threats and changing field conditions.

### Alerts

Centralized view of detected problems and recommended actions.

### Analytics

Historical field and environmental data.

### Edge Device

Monitor:

* Device connectivity
* AI status
* Sensor status
* Synchronization state

---

# 🎬 Demo Scenarios

FarmGuard AI can be demonstrated using multiple simulated field conditions.

### 🟢 Healthy Farm

```text
Crop Health: Healthy
Soil Moisture: Optimal
Climate Risk: Low
Alerts: None
```

### 💧 Water Stress

```text
Soil Moisture: Low
Rainfall: Insufficient
Risk: Water Stress

→ Irrigation Recommended
```

### 🦠 Disease Detection

```text
Crop Scan
     ↓
Disease Detected
     ↓
Severity Assessment
     ↓
Farmer Alert
     ↓
Recommended Action
```

### 🐛 Pest Outbreak

```text
Pest Activity Detected
        ↓
Risk Assessment
        ↓
Field Alert
        ↓
Recommended Response
```

### 🌡️ Heat Stress

```text
Temperature ↑
Humidity ↓
       ↓
Environmental Risk
       ↓
Heat Stress Alert
```

### 🌊 Flood Risk

```text
Rainfall ↑
Water Level ↑
      ↓
Flood Risk
      ↓
Critical Alert
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/FarmGuard-AI.git

cd FarmGuard-AI
```

## 2. Create a Python environment

```bash
python -m venv .venv
```

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

## 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

## 4. Configure environment variables

Create a `.env` file based on:

```bash
cp .env.example .env
```

Example:

```env
AI_MODE=demo
SENSOR_MODE=demo
DATABASE_URL=sqlite:///./farmguard.db
```

---

# ▶️ Running the Backend

Start the FastAPI server:

```bash
uvicorn backend.main:app --reload
```

The API will be available locally at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

# ▶️ Running the Frontend

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local development URL provided by Vite.

---

# 🔌 API Overview

The backend is designed around REST APIs.

| Endpoint                         | Method | Purpose                   |
| -------------------------------- | ------ | ------------------------- |
| `/api/health`                    | GET    | Backend health check      |
| `/api/farm/status`               | GET    | Farm overview             |
| `/api/farm/fields`               | GET    | Field information         |
| `/api/crop/analyze`              | POST   | Analyze crop image        |
| `/api/pest/analyze`              | POST   | Analyze pest activity     |
| `/api/irrigation/status`         | GET    | Irrigation status         |
| `/api/irrigation/recommendation` | GET    | Irrigation recommendation |
| `/api/climate/risk`              | GET    | Climate risk              |
| `/api/alerts`                    | GET    | Retrieve alerts           |
| `/api/analytics`                 | GET    | Farm analytics            |
| `/api/device/status`             | GET    | Edge device status        |

---

# 🤖 AI Modes

FarmGuard AI can be developed with two operating modes.

### Demo Mode

Designed for:

* Hackathons
* UI demonstrations
* Development
* Testing without hardware

```env
AI_MODE=demo
```

### Real Mode

Designed for deployment with actual AI models.

```env
AI_MODE=real
```

This architecture allows the prototype to be demonstrated without requiring expensive hardware while keeping the system ready for future real-world AI inference.

---

# 📡 Sensor Modes

### Demo

```env
SENSOR_MODE=demo
```

Uses simulated sensor readings.

### Hardware

```env
SENSOR_MODE=real
```

Designed to allow integration with physical agricultural sensors.

---

# 🔐 Security & Configuration

Do not commit sensitive credentials to GitHub.

Use environment variables for:

* API keys
* Database credentials
* Cloud credentials
* Model configuration
* External service configuration

Add your `.env` file to `.gitignore`.

---

# 🧪 Development Philosophy

FarmGuard AI is being developed around several principles:

### Edge First

Critical intelligence should not always depend on the cloud.

### Actionable AI

Predictions should lead to understandable actions.

### Farmer First

The interface should simplify agricultural decisions rather than expose unnecessary technical complexity.

### Modular Architecture

AI models, sensors, APIs, and frontend components should

